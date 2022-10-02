import { useEffect, useRef, useState } from "react"

import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "semantic-ui-react"
import { Grid, GridColumn, GridRow } from "semantic-ui-react"
import { Menu, MenuItem } from "semantic-ui-react"
import { SidebarPusher, SidebarPushable } from "semantic-ui-react"
import { Form, FormGroup, FormInput, } from "semantic-ui-react"

import { Container, Segment, Button, Sidebar, Header } from "semantic-ui-react" 

import { ToastContainer, toast } from 'react-toastify';

import axiosBaseURL from "../../AxiosBaseURL/axiosBaseURL"

import Pagination from "./Pagination/pagination"
import Delete from "./BooksCRUD/delete"
import Update from "./BooksCRUD/update"
import Create from "./BooksCRUD/create"
import Display from "./BooksCRUD/display"
import Logout from "../../Authentication/logout"

import FilterMultipleData from "./SearchData/filterMultipleData"

import filterData from "./SearchData/filterData"
import { Link } from "react-router-dom"

import io from 'socket.io-client'

function View() {

  // Save responsed data
  const [listBooks, setListBooks] = useState([])

  // Display on screen (using for pagination)
  const [listDisplayBooks, setListDisplayBooks] = useState([])

  //Save categories, authors, publisher
  const [listCategories, setListCategories] = useState([])
  const [listAuthors, setListAuthors] = useState([])

  const [listPublishers, setListPublishers] = useState([])
  const [booksOfCategory, setBooksOfCategory] = useState([])

  const [currentPage, setCurrentPage] = useState(1)

  // Search data by input element
  const [searchTitleValue, setSearchTitleValue] = useState("")

  // Display sidebar
  const [visibleSidebar, setVisibleSidebar] = useState(false)

  const [role, setRole] = useState(localStorage.getItem('role') === 'admin' ? true : false)

  const username = localStorage.getItem('username')
  const token = localStorage.getItem('token')

  const getDisplayBooks = (res) => {
    let start = (currentPage-1)*5
    let end = (currentPage-1)*5 + 5 <= res.length ? (currentPage-1)*5 + 5 : res.length

    let booksOnPerPage = res.slice(start, end)
    setListDisplayBooks(booksOnPerPage)
  }

  const displayToast = (message, action) => {
    toast(message,{
      autoClose: 2000,
      type: 'infor',
  })
  }

  const setData = (res) => {

    setListBooks(res)
    setBooksOfCategory(res)
    getDisplayBooks(res)
    setListCategories(filterData(res,"category"))
    setListAuthors(filterData(res,"author"))
    setListPublishers(filterData(res,"publisher"))

  }

  const getData = async () => {

    let res = await axiosBaseURL.get('view')
    let responsedData = res.data

    setData(responsedData)

  }

  //Search Input
  const handleOnchange = (e) =>{
    setSearchTitleValue(e.target.value);
    let data = listBooks.filter( item => item.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()))
    setBooksOfCategory(data)
    setListDisplayBooks(data.slice(0,5))
  }

  useEffect(() => {
    getData()
  },[])

  useEffect(() => {

    const socket = io('http://localhost:8080/notify',{
      auth: {
        token: localStorage.getItem('token')
      }
    })

    socket.emit('join room', {username})

    socket.on('notifyLogin', data => {
      let {username, time, status} = data

        displayToast(status + ' - ' + username + ' - ' + time,'')

    })

    socket.on('notifyLogout', data => {
      let {username, time, status} = data

        displayToast(status + ' - ' + username + ' - ' + time,'')

    })

    return () => {
      socket.off('notifyLogin')
      socket.off('notifyLogout')
    }
  },[])

  return (
      <Grid columns={1} divided>
        <GridRow as={Header}>
          <Menu fixed='top' inverted={true} color ="teal">
            <MenuItem header>
                Project Name
            </MenuItem>
            <MenuItem header>
              Book
            </MenuItem>
            {role ? 
              <MenuItem header>
                <Link to='/manageUserAccounts' >Accounts</Link>
              </MenuItem> : ""
            }
            <MenuItem position="right">
              <Logout />
            </MenuItem>   
          </Menu>
        </GridRow>
        
        <GridRow><ToastContainer/></GridRow>
        <GridRow>
          <GridColumn style={{marginTop: '2em'}}>
            <Button
              style = {{padding: "1em", margin: "1em"}}
              icon = "search"
              circular
              color="teal"
              onClick = {() => setVisibleSidebar(!visibleSidebar)}
            >
            </Button>
          </GridColumn>
          <GridColumn>
            <SidebarPushable >
              <Sidebar
                inverted={true} color = "teal"
                as={Menu}
                animation='scale down'
                onHide={() => setVisibleSidebar(false)}
                vertical
                visible={visibleSidebar}
              >
                <MenuItem>
                  <Form>
                    <FormGroup style={{marginTop: '5em'}}>
                      <FormInput
                        icon="search"
                        inverted={true} color="blue"
                        placeholder='Search...'
                        value = {searchTitleValue}
                        onChange={handleOnchange}
                        type='text'
                      ></FormInput>
                    </FormGroup>
                  </Form>
                </MenuItem>
                <MenuItem>
                  <FilterMultipleData 
                    setBooksOfCategory={setBooksOfCategory}
                    setListDisplayBooks={setListDisplayBooks}
                    listBooks={listBooks} 
                    listAuthors={listAuthors} 
                    listCategories={listCategories} 
                    listPublishers={listPublishers}
                  />
                </MenuItem>

              </Sidebar>
                <SidebarPusher>
                  <Container style={{ marginTop: '1em', height: "500px" }}>
                    {/* <Segment  style={{padding: "0em 0em"}}> */}
                    {role ? 
                      <Create textAlign="right" 
                        getData={getData} 
                        displayToast={displayToast} 
                        getDisplayBooks={getDisplayBooks}
                      />: ""}
                    <Table celled >
                      <TableHeader style={{color: "blue", margin: "0em"}}>
                        <TableRow textAlign="center">
                          <TableHeaderCell>No</TableHeaderCell>
                          <TableHeaderCell>Book Code</TableHeaderCell>
                          <TableHeaderCell>Title</TableHeaderCell>
                          <TableHeaderCell>Category</TableHeaderCell>
                          <TableHeaderCell>Author</TableHeaderCell>
                          <TableHeaderCell>Publisher</TableHeaderCell>
                          {
                            role ? <TableHeaderCell>Action</TableHeaderCell> : ""
                          }
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {listDisplayBooks.map( (bookInfo, index) => (
                          <TableRow key={bookInfo.id}>
                            <TableCell>{index+1 + (currentPage-1)*5}</TableCell>
                            <TableCell>{bookInfo.bookId}</TableCell>
                            <TableCell>{bookInfo.title}</TableCell>
                            <TableCell>{bookInfo.category}</TableCell>
                            <TableCell>{bookInfo.author}</TableCell>
                            <TableCell>{bookInfo.publisher}</TableCell>
                            
                            <TableCell textAlign="center">
                              {role ? 
                              <Update 
                                bookInfo={bookInfo} 
                                getData={getData}
                                listDisplayBooks={listDisplayBooks}
                                displayToast={displayToast}
                              /> : ""}

                              {role ? 
                              <Delete 
                                bookInfo={bookInfo} 
                                getData={getData}
                                currentPage={currentPage}
                                listDisplayBooks={listDisplayBooks}
                                displayToast={displayToast}
                              /> : ""}

                              <Display 
                                bookInfo={bookInfo}
                                displayToast={displayToast}
                              />
                            </TableCell> 
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <Segment textAlign="center" style={{padding: "0em 0em", marginTop: "0em"}}>
                      <Pagination 
                        books={booksOfCategory} 
                        setListDisplayBooks={setListDisplayBooks}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                      />
                    </Segment>
                    {/* </Segment> */}
                  </Container>
                </SidebarPusher>
            </SidebarPushable>
          </GridColumn>
        </GridRow>
      </Grid>

  )
}

export default View







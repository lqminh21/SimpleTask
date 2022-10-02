import { useEffect, useState } from "react"
import axios from "axios"

import { Dropdown, Container, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, Item, Segment, Button, FormGroup, FormInput, SegmentInline, Grid, GridColumn, Checkbox, Sidebar, SidebarPusher, GridRow, SidebarPushable, Label } from "semantic-ui-react" 
import { Menu, MenuItem, Input, Icon, Form, Header } from "semantic-ui-react"

import axiosBaseURL from "../../AxiosBaseURL/axiosBaseURL"

import Pagination from "./Pagination/pagination"
// import Delete from "./BooksCRUD/delete"
// import Update from "./BooksCRUD/update"
// import Create from "./BooksCRUD/create"
import Logout from "../../validation/logout"

import Category from "./SearchData/category"
import Author from "./SearchData/author"
import Publisher from "./SearchData/publisher"
import filterData from "./SearchData/FilterData/filterData"
import { Link, Navigate } from "react-router-dom"

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

  // Search data by input element
  const [searchTitleValue, setSearchTitleValue] = useState("")

  // Display sidebar
  const [visibleSidebar, setVisibleSidebar] = useState(false)

  const setData = (res) => {
    setListBooks(res)
    setListDisplayBooks(res.slice(0,5))
    setBooksOfCategory(res)
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

  return (
      <Grid columns={1} divided>
        <GridRow as={Header}>
          <Menu fixed='top' inverted={true}>
            <MenuItem header>
                Project Name
            </MenuItem>
            <MenuItem position="right">
              <Logout />
            </MenuItem>   
          </Menu>
        </GridRow>
        <GridRow>
          <GridColumn style={{marginTop: '2em'}}>
            <Button
              onClick = {() => setVisibleSidebar(!visibleSidebar)}
            >
              <Icon name="search" />
            </Button>
          </GridColumn>
          <GridColumn>
            <SidebarPushable as={Segment}>
              <Sidebar
                as={Menu}
                animation='scale down'
                inverted={true}
                onHide={() => setVisibleSidebar(false)}
                vertical
                visible={visibleSidebar}
              >
                <MenuItem>
                  <Form>
                    <FormGroup style={{marginTop: '5em'}}>
                      <FormInput
                        placeholder='Search...'
                        value = {searchTitleValue}
                        onChange={handleOnchange}
                        type='text'
                      ></FormInput>
                      <Button type="submit"></Button>
                    </FormGroup>
                  </Form>
                </MenuItem>
                <MenuItem>
                  <Category 
                    setListDisplayBooks={setListDisplayBooks} 
                    setBooksOfCategory={setBooksOfCategory}
                    booksOfCategory={booksOfCategory} 
                    listBooks={listBooks} 
                    listCategories={listCategories} 
                  />
                </MenuItem>
                <MenuItem>
                  <Author 
                    setListDisplayBooks={setListDisplayBooks} 
                    setBooksOfCategory={setBooksOfCategory} 
                    booksOfCategory={booksOfCategory}
                    listBooks={listBooks} 
                    listAuthors={listAuthors} 
                  />
                </MenuItem>
                <MenuItem>
                  <Publisher 
                    setListDisplayBooks={setListDisplayBooks} 
                    setBooksOfCategory={setBooksOfCategory} 
                    booksOfCategory={booksOfCategory}
                    listBooks={listBooks} 
                    listPublishers={listPublishers}
                  />
                </MenuItem>
              </Sidebar>
                <SidebarPusher>
                  <Container style={{ marginTop: '1em', height: "500px" }}>
                    <Segment>
                    {/* <Create textAlign="right" getData={getData}/> */}
                    <Table celled className="ten wide">
                      <TableHeader>
                        <TableRow textAlign="center">
                          <TableHeaderCell>No</TableHeaderCell>
                          <TableHeaderCell>Book Code</TableHeaderCell>
                          <TableHeaderCell>Title</TableHeaderCell>
                          <TableHeaderCell>Category</TableHeaderCell>
                          <TableHeaderCell>Author</TableHeaderCell>
                          <TableHeaderCell>Publisher</TableHeaderCell>
                          {/* <TableHeaderCell>Action</TableHeaderCell> */}
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {listDisplayBooks.map( (bookInfo, index) => (
                          <TableRow>
                            <TableCell>{bookInfo.id}</TableCell>
                            <TableCell>{bookInfo.bookId}</TableCell>
                            <TableCell>{bookInfo.title}</TableCell>
                            <TableCell>{bookInfo.category}</TableCell>
                            <TableCell>{bookInfo.author}</TableCell>
                            <TableCell>{bookInfo.publisher}</TableCell>
                            {/* <TableCell textAlign="center">
                              <Update bookInfo={bookInfo} getData={getData}/>
                              <Delete bookInfo={bookInfo} getData={getData}/>
                            </TableCell> */}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <Segment textAlign="center">
                      <Pagination books={booksOfCategory} setListDisplayBooks={setListDisplayBooks}/>
                    </Segment>
                    </Segment>
                  </Container>
                </SidebarPusher>
            </SidebarPushable>
          </GridColumn>
        </GridRow>
      </Grid>

  )
}

export default View
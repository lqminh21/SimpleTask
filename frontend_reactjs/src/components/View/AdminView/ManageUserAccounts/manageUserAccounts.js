
import { useEffect, useState } from "react"

import { Table, TableBody, TableRow, TableCell, TableHeader, TableHeaderCell } from "semantic-ui-react"
import { Grid, GridRow, GridColumn, } from "semantic-ui-react"
import { SidebarPusher, SidebarPushable } from "semantic-ui-react"
import { Menu, MenuItem } from "semantic-ui-react"

import { Container, Segment, Header } from "semantic-ui-react"

import { Link } from "react-router-dom"

import axiosBaseURL from "../../../AxiosBaseURL/axiosBaseURL"

import Delete from "./UsersCRUD/delete"
import Update from "./UsersCRUD/update"
import Create from "./UsersCRUD/create"
import Logout from "../../../Authentication/logout"


function View() {
   
  const [userAccountsList, setUserAccountsList] = useState([])

  const [displayedAcounts, setDisplayedAccount] = useState([])

  const [searchTitleValue, setSearchTitleValue] = useState("")

  // const [visibleSidebar, setVisibleSidebar] = useState(false)


  const getData = async () => {

    let res = await axiosBaseURL.get('/manageUserAccounts')

    let responsedData = res.data

    setUserAccountsList(responsedData)
  }

  //Search Input
  // const handleOnchange = (e) =>{
  //   setSearchTitleValue(e.target.value);
  //   let data = listBooks.filter( item => item.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()))
  //   setBooksOfCategory(data)
  //   setListDisplayBooks(data.slice(0,5))
  // }
  
  useEffect(() => {
    getData()
  },[])

  return (
      <Grid columns={1} divided>
        <GridRow as={Header}>
        <Menu fixed='top' inverted={true} color="teal">
            <MenuItem header>
                Project Name
            </MenuItem>
            <MenuItem header>
                <Link to='/view' >Book</Link>
            </MenuItem>
            <MenuItem>Accounts</MenuItem>
            <MenuItem position="right">
              <Logout />
            </MenuItem>   
          </Menu>
        </GridRow>
        <GridRow>
          {/* <GridColumn style={{marginTop: '2em'}}>
            <Button
              onClick = {() => setVisibleSidebar(!visibleSidebar)}
            >
              <Icon name="search" />
            </Button>
          </GridColumn> */}
          <GridColumn>
            <SidebarPushable as={Segment}>
              {/* <Sidebar
                as={Menu}
                animation='scale down'
                inverted
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

                </MenuItem>
                <MenuItem>

                </MenuItem>
                <MenuItem>

                </MenuItem>
              </Sidebar> */}
                <SidebarPusher>
                  <Container style={{ marginTop: '1em' }}>
                    <Segment>
                    <Create textAlign="right" getData={getData}/>
                    <Table celled unstackable padded >
                      <TableHeader>
                        <TableRow textAlign="center">
                          <TableHeaderCell>No</TableHeaderCell>
                          <TableHeaderCell>Username</TableHeaderCell>
                          <TableHeaderCell>Password</TableHeaderCell>
                          <TableHeaderCell>Email</TableHeaderCell>
                          <TableHeaderCell>Action</TableHeaderCell>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {userAccountsList.map( (user, index) => (
                          <TableRow>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.password}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell textAlign="center">
                              <Update user={user} getData={getData}/>
                              <Delete user={user} getData={getData}/>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <Segment textAlign="center">
                      {/* <Pagination accountsList={accountsList} setDisplayedAccount={setDisplayedAccount}/> */}
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

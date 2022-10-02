import axios from "axios"
import { useState, useContext } from "react"
import { AuthContext } from "../AuthProvider/AuthProvider"
import { Link, useNavigate } from "react-router-dom"
import { Button, Form, FormField, Grid, GridColumn, Input, Label, Segment } from "semantic-ui-react"

import io from 'socket.io-client'

export default function Login(){

    const context = useContext(AuthContext)

    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [errMessage, setErrMessage] = useState("")

    const handleSubmit = async () => {
        try{
            let res = await axios.post("http://localhost:8080/login",{
                username, password
            })

            let time = (new Date()).toString()

            const {role, resUsername, accessToken} = res.data

            if(accessToken){
    
                context.checkAuth(true)
                context.checkRole(res.data.role)
    
                localStorage.setItem("role", role)
                localStorage.setItem("token", accessToken)
                localStorage.setItem("username", resUsername)

                const socket = io('http://localhost:8080/notify', {
                    auth: {
                      token: accessToken
                    }
                })

                socket.emit('login', {username, time, status: 'LOG IN'})

                navigate('/view')
            }
            else setErrMessage(res.data.message)
        }catch(err){
            console.log(err)
        }
    }


    return(
        
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <GridColumn style = {{maxWidth: '50vh'}}>
            <Form>
                <Segment padded inverted={true} color="teal">
                    <FormField>
                        <Label size="large" color="teal">Username</Label>
                        <Input
                            type="text"
                            placeholder = 'Enter Username'
                            autocomplete = 'Username'
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </FormField>
                    <FormField>
                        <Label size="large" color="teal">Password</Label>
                        <Input
                            type="password"
                            placeholder = 'Enter Password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormField>
                    {errMessage ? 
                        <FormField>
                            <strong>{errMessage}</strong>
                        </FormField> : ""
                    }
                    <FormField>
                        <Button circular fluid type="submit" onClick={handleSubmit}>Submit</Button>
                    </FormField>
                    
                    <Label size="large" >Need an account ?<Link to = '/register'> Signup </Link></Label>  
                </Segment>
            </Form>
            </GridColumn>
        </Grid>
    )
}
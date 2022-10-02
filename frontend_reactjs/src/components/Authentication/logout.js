import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider"
import { Button } from "semantic-ui-react";

import io from 'socket.io-client'

export default function Logout(){

    const context = useContext(AuthContext)

    const navigate = useNavigate()

    let token = window.localStorage.getItem('token')
    let username = window.localStorage.getItem('username')

    const handleClick = async () => {
        let res = await axios.post("http://localhost:8080/logout",{
            token
        })

        let time = (new Date()).toString()

        if(res){

            const socket = io('http://localhost:8080/notify',{
                auth: {
                    token
                }
            })

            socket.emit('logout', {username, time, status: 'LOG OUT'})

            window.localStorage.removeItem('token')
            window.localStorage.removeItem('role')
            window.localStorage.removeItem('username')
            context.checkAuth(false)

            navigate('/login')
        }
        else alert("Logout failed !")

    }

    return(
        <Button inverted={true} onClick={handleClick}>Log out</Button>
    )
}
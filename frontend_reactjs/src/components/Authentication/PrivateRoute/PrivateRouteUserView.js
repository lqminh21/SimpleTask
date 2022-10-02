
import { useEffect, useState, useContext } from "react"
import axios, { Axios } from "axios"
import { Outlet } from "react-router-dom"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../../AuthProvider/AuthProvider"

export default function PrivateRouteView(){
    
    const context = useContext(AuthContext)
    
    return(
        context.auth && context.role === 'user' ? <Outlet /> : <Navigate to='/login' />
    )
}



import { useContext } from "react"
import { Outlet } from "react-router-dom"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../../AuthProvider/AuthProvider"

export default function PrivateRouteView(){
    
    const context = useContext(AuthContext)
    
    return(
        context.auth && context.role  ? <Outlet /> : <Navigate to='/login' />
    )
}
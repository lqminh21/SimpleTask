
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from "./components/Authentication/login"
import AdminView from "./components/View/AdminView/AdminView"
import Register from './components/Authentication/register'
import ManageUser from "./components/View/AdminView/ManageUserAccounts/manageUserAccounts"
import ErrorPage from "./components/View/errorPage"


import PrivateRouteAdminView from "./components/Authentication/PrivateRoute/PrivateRouteAdminView"
import PrivateRouteLogin from "./components/Authentication/PrivateRoute/PrivateRouteLogin"

function App() {

  return (
    <Router>
      <Routes>
        <Route element={<PrivateRouteAdminView />}>
          <Route path="/view" element={<AdminView />}></Route>
          <Route path="/manageUserAccounts" element={<ManageUser />}></Route>            
        </Route >

        <Route path="/" element={<PrivateRouteLogin />} >
          <Route path="/login" element={<Login />}></Route>
        </Route>

        <Route path="/register" element={<Register />}></Route>

        <Route path="/*" element={<ErrorPage />}></Route>
        
      </Routes>
    </Router>
  )
}

export default App;

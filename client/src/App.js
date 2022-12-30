import React,{useState} from "react";
import {Link,Route} from 'react-router-dom'
import { useDispatch } from "react-redux";
import Login from "./components/Login";
import Register from "./components/Register";
import PageContainer from "./components/PageContainer";
import { logout } from "./actions/userAction";
import './Styling/app.css'
function App() {
  const [loggedIn,setLoggedIn] = useState(!!(localStorage.getItem('token')))
  const dispatch = useDispatch()
  const handleToggle = (value) => {
    setLoggedIn(value)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setLoggedIn(false)
    dispatch(logout())
  }
  return (
    <div className="nav-bar">
      {
        !loggedIn ? <>
            <Link to="/register" className="link">Register</Link>
            <Link to="/login" className="link">Login</Link>
        </> : <>
            <Link to="/login" onClick={handleLogout} className="logout">logout</Link>
        </>
      }
      <Route path = "/login" render={(props)=>{
        return (
          <Login {...props} handleToggle={handleToggle} />
        )
      }} exact />
      <Route path = "/register" component={Register} exact />
      <Route path = "/home" render={(props)=>{
        return localStorage.getItem('token')?<PageContainer {...props}/>:<Login />
      }} exact />

    </div>
  );
}

export default App;

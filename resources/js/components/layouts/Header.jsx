import React, { useEffect } from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import { useNavigate, } from 'react-router-dom' 

import "./Header.scss"

export default function Header(props) {

  const navigate = useNavigate()
  
  const dispatch = useDispatch()
  const authResponse = useSelector(state=>state.auth)

  useEffect(() => {    
    if(authResponse.error){
      return navigate("/user/login")    
    }
  }, [authResponse])

  const renderNavLinks = () => {
    if(authResponse.data) {
      return <a 
        className="dropdown-item" 
        href="/user/logout"
      >
        Logout
      </a>
    } else {
        return <>
          <a 
            className="dropdown-item" 
            href="/user/login"
          >
            Login
          </a>
          <a 
            className="dropdown-item" 
            href="/user/register"
          >
            Register
          </a>
        </>
    }
  }

  return <nav className="container navbar navbar-expand-lg bg-primary">
    <div className="container-fluid">
      <a className="navbar-brand" href="/">Movies PHP Reactjs App 2</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/movies">Movies Home</a>
          </li>
        </ul>
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              User
            </a>
            <ul className="dropdown-menu">
              <li>{renderNavLinks()}</li>              
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
}

import React from 'react'
import { NavLink} from 'react-router-dom'
import {PiUserRectangleThin} from 'react-icons/pi'
import '../App.css'
import { useContext } from 'react'
import {proContext} from '../Contexts/prologin'
function Navbar() {
  let [a,b,c,d,e] = useContext(proContext)
  const active={
    backgroundColor:"black",
    color: "white",
    borderRadius:"2rem"
  }
  const inactive={
    color:"black"
  }
  return (
    <nav className="navbar navbar-expand-sm">
  <div className="container-fluid">
    <PiUserRectangleThin size={42}/>
    <h4>EventEase<h4/>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className='nav-item'>
        
        </li>
        { d ? <NavLink className="nav-item nav-link" to="/plogin" style={({isActive})=>{
          return isActive?active:inactive
        }} onClick={e}>
          Logout
        </NavLink>
        :
        <NavLink className="nav-item nav-link" to="/plogin" style={({isActive})=>{
          return isActive?active:inactive
        }}>
          Login
        </NavLink>
        }

        
        <NavLink className="nav-item nav-link" to="/" style={({isActive})=>{
          return isActive?active:inactive
        }}>
          Home
        </NavLink>
        
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Navbar

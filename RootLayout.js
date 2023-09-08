import React from 'react'
import Navbar from './components/navbar'
import { Outlet } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
function RootLayout() {
  return (
    <div className='rootlayout'>
      <Navbar/>
      <div className='outlet'>
        <Outlet/>
      </div>
      
      <Footer/>
    </div>
  )
}

export default RootLayout

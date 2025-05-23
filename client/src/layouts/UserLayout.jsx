import React from 'react'
import {Outlet} from "react-router-dom"
import Navbar from '../components/user/Navbar'
import Footer from '../components/user/Footer'
const UserLayout = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default UserLayout
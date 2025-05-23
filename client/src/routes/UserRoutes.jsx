import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/user/Home'
import Contact from '../pages/user/Contact'
import UserLayout from '../layouts/UserLayout'
import AdminLogin from '../pages/admin/AdminLogin'
import CourseList from '../pages/user/CourseList'
import NotFound from '../utils/NotFound'
import Test from '../pages/user/Test'
import CourseDetails from '../pages/user/CourseDetails'
import QuizApp from '../pages/user/QuizApp'
import About from '../pages/user/About'
const UserRoutes = () => {
  return (

    <Routes>
        <Route element={<UserLayout/>}>
        <Route path='/' element={<Home/>} />
        <Route path='/auth' element={<AdminLogin/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/course-list' element={<CourseList/>} />
        <Route path='/course-details/:id' element={<CourseDetails/>} />
        <Route path='/online-test' element={<Test/>} />
        <Route path="/quiz/course/:id" element={<QuizApp />} />
        <Route path="/quiz/chapter/:id" element={<QuizApp />} />


        <Route path='*' element={<NotFound/>} />
        </Route>
    </Routes>
  )
}

export default UserRoutes
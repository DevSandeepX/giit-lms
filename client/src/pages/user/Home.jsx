import React from 'react'
import {useNavigate} from "react-router-dom"
const Home = () => {
    const navigate = useNavigate()
  return (
    <div className="h-[580px] flex flex-col items-center justify-center px-4 text-center">


    <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold max-w-4xl text-gray-800">GIIT Online Test Portal – Prepare, Practice, Perform</h1>
    <p className="max-w-xl text-center mt-6 px-4">Welcome to GIIT – your trusted platform for online tests, mock exams, and skill assessments. Access subject-wise practice papers, timed exams, and instant results. Designed for students to succeed with smart preparation tools and detailed performance analysis.</p>
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
        <button className="px-7 py-3 rounded bg-indigo-500 text-white font-medium" onClick={()=>navigate("/online-test")}>Get Started Now</button>
       
    </div>
</div>

  )
}

export default Home
import React from 'react'
import { useNavigate } from 'react-router-dom'
const CourseCard = ({course}) => {
  const navigate = useNavigate()
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm text-sm max-w-80">
    <img className="rounded-md max-h-40 w-full object-cover" src={course.image} alt="officeImage"/>
    <p className="text-gray-900 text-xl font-semibold ml-2 mt-2">{course.title.slice(0,20)}..</p>
    <p className="text-gray-500 mt-3 ml-2">{course.description.slice(1,240)}...</p>
    <button type="button" className="bg-indigo-500 mt-4 mb-3 ml-2 px-6 py-2 font-medium rounded text-white" onClick={()=>navigate(`/course-details/${course._id}`)}>Course Info</button>
</div>
  )
}

export default CourseCard
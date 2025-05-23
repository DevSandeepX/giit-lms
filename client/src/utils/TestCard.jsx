import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_COURSES } from '../graphql/querys/getCourses';
import LoadingSpinner from '../components/admin/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
const TestCard = ({course}) => {
    const { loading, error, data } = useQuery(GET_COURSES);
    const courses = data?.getCourses || [];
    const navigate = useNavigate()
  if (loading) {
    return <LoadingSpinner/>;
  }
  return (
  <div className="p-4 bg-white rounded-lg shadow-sm text-sm max-w-80">
    <img className="rounded-md max-h-40 w-full object-cover" src={course.image} alt="officeImage"/>
    <p className="text-gray-900 text-xl font-semibold ml-2 mt-2">{course.title}</p>
    <button onClick={()=>navigate(`/quiz/course/${course._id}`)} type="button" className="bg-indigo-500 mt-4 mb-3 ml-2 px-6 py-2 font-medium rounded text-white">Start Test</button>
</div>
  )
}

export default TestCard
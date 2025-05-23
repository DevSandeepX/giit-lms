import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
import { GET_COURSES } from '../../graphql/querys/getCourses';
import { GET_COURSES_WITH_CHAPTERS } from '../../graphql/querys/chapterQuery';
import TestCard from '../../utils/TestCard';
import LoadingSpinner from '../../components/admin/LoadingSpinner';
import ChapterCrad from '../../utils/ChapterCrad';
const Test = (course) => {
  const { loading, error, data } = useQuery(GET_COURSES_WITH_CHAPTERS);
  const courses = data?.getCourses || [];
  // console.log(courses)
  const [selectedCourse, setSelectedCourse] = useState({})
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center text-red-500 font-medium p-10">Error loading courses.</div>;
  }

  const handleSelectCourse = (id) => {
    if (!id) return alert("ID not provided");

    const foundCourse = courses.find((course) => course._id === id);

    if (!foundCourse) {
      return alert("Course not found");
    }

    setSelectedCourse(foundCourse);

  };


  return (
    <div className="px-4 sm:px-8 py-6 max-w-7xl mx-auto bg-gray-200">
       <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          📘 Chapter-Wise Test
        </h2>

        {/* Course Selector */}
        <div className="flex justify-center mb-6">
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md text-gray-700 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            onChange={(e) => handleSelectCourse(e.target.value)}
          >
            <option value="">🎓 Select a Course</option>
            {courses.map((course) => (
              <option value={course._id} key={course._id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        {/* Course Title */}
        {selectedCourse?.title && (
          <h3 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
            📚 {selectedCourse.title} - All Chapters
          </h3>
        )}

        {/* Chapter Cards */}


        {selectedCourse?.chapters?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {selectedCourse.chapters.map((ch) => (
              <ChapterCrad key={ch._id} chapter={ch} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-40">
            <h2 className="text-xl text-gray-500 font-semibold">📭 No Chapters Available</h2>
          </div>
        )}




      </div>




      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Course Wise Test</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <TestCard key={course._id} course={course} />
        ))}
      </div>

     



    </div>
  )
}

export default Test
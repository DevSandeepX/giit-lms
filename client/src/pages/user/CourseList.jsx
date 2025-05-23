import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_COURSES } from '../../graphql/querys/getCourses';
import CourseCard from '../../utils/CourseCard';
import LoadingSpinner from '../../components/admin/LoadingSpinner';

const CourseList = () => {
  const { loading, error, data } = useQuery(GET_COURSES);
  const courses = data?.getCourses || [];

  if (loading) {
    return <LoadingSpinner/>;
  }

  if (error) {
    return <div className="text-center text-red-500 font-medium p-10">Error loading courses.</div>;
  }

  return (
    <div className="px-4 sm:px-8 py-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">All Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseList;

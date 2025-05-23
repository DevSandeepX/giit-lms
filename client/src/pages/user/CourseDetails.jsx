import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_COURSE_BY_ID } from '../../graphql/querys/getCourses';

const CourseDetails = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_COURSE_BY_ID, {
    variables: { courseId: id }
  });


  if (loading) return <div className="text-center py-10 text-lg">Loading course...</div>;
  if (error) return <div className="text-center text-red-500 py-10">Error loading course.</div>;

  const course = data?.getCourseById;
  console.log(course.chapters)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-xl rounded-2xl p-6">
        
        {/* Course Image */}
        <div className="w-full h-64 md:h-auto overflow-hidden rounded-xl">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Course Content */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{course.title}</h1>

            {/* Rating */}
            <div className="flex items-center mt-2 space-x-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 fill-indigo-500/40"
                  viewBox="0 0 18 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8.04894 0.927049C8.3483 0.00573802 9.6517 0.00574017 9.95106 0.927051L11.2451 4.90983C11.379 5.32185 11.763 5.60081 12.1962 5.60081H16.3839C17.3527 5.60081 17.7554 6.84043 16.9717 7.40983L13.5838 9.87132C13.2333 10.126 13.0866 10.5773 13.2205 10.9894L14.5146 14.9721C14.8139 15.8934 13.7595 16.6596 12.9757 16.0902L9.58778 13.6287C9.2373 13.374 8.7627 13.374 8.41221 13.6287L5.02426 16.0902C4.24054 16.6596 3.18607 15.8934 3.48542 14.9721L4.7795 10.9894C4.91338 10.5773 4.76672 10.126 4.41623 9.87132L1.02827 7.40983C0.244561 6.84043 0.647338 5.60081 1.61606 5.60081H5.8038C6.23703 5.60081 6.62099 5.32185 6.75486 4.90983L8.04894 0.927049Z" />
                </svg>
              ))}
            </div>

            {/* Description */}
            <p className="mt-4 text-gray-600 leading-relaxed text-sm">
              {course.description}
            </p>

            {/* Chapters */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Chapters Included:</h2>
              {course?.chapters?.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                  {course.chapters.map((ch) => (
                    <li key={ch.title}>{ch.title}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No chapters available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;

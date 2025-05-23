import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_COURSES } from '../../graphql/querys/getCourses'; // Your GraphQL query for fetching courses
import UpdateCourse from './UpdateCourse';
import { DELETE_COURSE } from '../../graphql/mutations/courseMutation';
import LoadingSpinner from '../../components/admin/LoadingSpinner';

const CourseList = () => {
  const { loading, error, data } = useQuery(GET_COURSES);
  const [selectedCourse, setSelectedCourse] = useState(null);


 const [deleteCourse, { loadingdl }] = useMutation(DELETE_COURSE, {
  refetchQueries: [{ query: GET_COURSES }],
  onCompleted: () => alert("Course deleted successfully"),
  onError: (err) => alert("Error deleting course: " + err.message),
});


  const courses = data?.getCourses || [];

  // Handle update button click
  const handleUpdateClick = (course) => {
    setSelectedCourse(course); // Set the course to update
  };

  // Close the modal
  const handleCloseModal = () => {
    setSelectedCourse(null); // Close modal when user clicks "Cancel" or after update
  };

  if (loading) return <LoadingSpinner/>;
  if (error) return <p>Error loading courses.</p>;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img className="w-full h-48 object-cover rounded-t-lg" src={course.image} alt={course.title} />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
              <p className="text-gray-600 mt-2">{course.description.slice(0,240)}..</p>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleUpdateClick(course)}
                  className="bg-indigo-600 text-white py-2 px-6 rounded-full font-medium transition-all hover:bg-indigo-700"
                >
                  Update
                </button>
                <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this course?")) {
                    deleteCourse({ variables: { courseId: course._id } });
                  }
                }}
                  className="bg-red-600 text-white py-2 px-6 rounded-full font-medium transition-all hover:bg-red-700" 
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCourse && (
        <UpdateCourse course={selectedCourse} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default CourseList;

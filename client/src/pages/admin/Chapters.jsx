import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_COURSES } from '../../graphql/querys/getCourses';
import { ADD_CHAPTER } from '../../graphql/mutations/chapterMutation';
import LoadingSpinner from '../../components/admin/LoadingSpinner';
import SuccessBox from '../../utils/SuccessBox';
const Chapters = () => {
  const { loading, error, data } = useQuery(GET_COURSES);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [chapterTitle, setChapterTitle] = useState('');


  const [addChapter, { loading: adding }] = useMutation(ADD_CHAPTER, {
    refetchQueries: [{ query: GET_COURSES }],
    onCompleted: () => {
      console.log('Chapter added successfully');
      setChapterTitle('');
      setSelectedCourse('');
    },
    onError: (error) => {
      console.error('Error adding chapter:', error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCourse || !chapterTitle.trim()) {
      alert('Please select a course and enter a chapter title.');
      return;
    }

    addChapter({
      variables: {
        courseId: selectedCourse,
        title: chapterTitle,
      },
    });
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error loading courses.</p>;

  const courses = data?.getCourses || [];

  return (
    <div className="bg-white p-6 rounded shadow max-w-xl">
      <h2 className="text-xl font-semibold mb-4">Add Chapter</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <select
          className="w-full p-2 border rounded"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Chapter Title"
          className="w-full p-2 border rounded"
          value={chapterTitle}
          onChange={(e) => setChapterTitle(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
          disabled={adding}
        >
          {adding ? 'Adding...' : 'Add Chapter'}
        </button>
      </form>
      
    </div>
  );
};

export default Chapters;

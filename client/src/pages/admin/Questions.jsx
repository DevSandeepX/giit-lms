import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_QUESTION } from '../../graphql/mutations/questionMutation';
import { GET_COURSES_WITH_CHAPTERS } from '../../graphql/querys/chapterQuery'; // Assuming this is your query to get courses and chapters
import LoadingSpinner from '../../components/admin/LoadingSpinner';

const Questions = () => {
  const [questionText, setQuestionText] = useState('');  // This is the state for question text
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOption, setCorrectOption] = useState(0);  // Initialize correctOption as a number
  const [courseId, setCourseId] = useState('');
  const [chapterId, setChapterId] = useState('');
  const [addQuestion, { loading, error }] = useMutation(ADD_QUESTION, {
    onCompleted: () => {
      // alert('Question added successfully!');
      setQuestionText('');
      setOptions(['', '', '', '']);
      setCorrectOption(0);  // Reset correctOption after successful addition
      // setCourseId('');
      // setChapterId('');
    },
    onError: (err) => {
      console.error('Error adding question:', err);
      alert('Failed to add question');
    }
  });

  const { data: courseData, loading: courseLoading, error: courseError } = useQuery(GET_COURSES_WITH_CHAPTERS);

  // Handle change in options
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    addQuestion({
      variables: {
        questionText,  // Pass questionText
        options,
        correctAnswer: correctOption,  // Using the correctOption index
        chapterId
      }
    });
  };

  if (courseLoading) return <LoadingSpinner/>;
  if (courseError) return <p>Error loading courses</p>;

  return (
    <div className="bg-white p-6 rounded shadow max-w-xl">
      <h2 className="text-xl font-semibold mb-4">Add Question</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          className="w-full p-2 border rounded"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
        >
          <option>Select Course</option>
          {courseData?.getCourses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>

        <select
          className="w-full p-2 border rounded"
          value={chapterId}
          onChange={(e) => setChapterId(e.target.value)}
        >
          <option>Select Chapter</option>
          {courseId &&
            courseData.getCourses
              .find((course) => course._id === courseId)
              ?.chapters.map((chapter) => (
                <option key={chapter._id} value={chapter._id}>
                  {chapter.title}
                </option>
              ))}
        </select>

        <textarea
          placeholder="Question Text"
          className="w-full p-2 border rounded"
          rows="3"
          value={questionText}  // Use questionText here
          onChange={(e) => setQuestionText(e.target.value)}  // Update questionText on change
        />

        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${String.fromCharCode(65 + index)}`}
            className="w-full p-2 border rounded"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
        ))}

        <input
          type="number"
          placeholder="Correct Option (0/1/2/3)"
          className="w-full p-2 border rounded"
          value={correctOption}
          onChange={(e) => setCorrectOption(Number(e.target.value))}  // Ensure it is treated as an integer
        />

        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? 'Adding Question...' : 'Add Question'}
        </button>
      </form>

      {error && <p className="text-red-500">Error: {error.message}</p>}
    </div>
  );
};

export default Questions;

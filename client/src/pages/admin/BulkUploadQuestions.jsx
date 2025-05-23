import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { BULK_UPLOAD_QUESTIONS } from '../../graphql/mutations/questionMutation';
import { GET_COURSES_WITH_CHAPTERS } from '../../graphql/querys/chapterQuery';
import LoadingSpinner from '../../components/admin/LoadingSpinner';

const BulkUploadQuestions = () => {
  const [jsonData, setJsonData] = useState([]);
  const [courseId, setCourseId] = useState('');
  const [chapterId, setChapterId] = useState('');
  const [filteredChapters, setFilteredChapters] = useState([]);

  const { data, loading } = useQuery(GET_COURSES_WITH_CHAPTERS);

  const [bulkUploadQuestions] = useMutation(BULK_UPLOAD_QUESTIONS, {
    onCompleted: (data) => {
      alert(data.bulkUploadQuestions.message);
    },
    onError: (error) => {
      console.error(error);
      alert("Upload failed!", error.message);
    }
  });

  useEffect(() => {
    if (courseId && data) {
      const selectedCourse = data.getCourses.find(course => course._id === courseId);
      setFilteredChapters(selectedCourse?.chapters || []);
    }
  }, [courseId, data]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        setJsonData(parsed);
      } catch (err) {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  const handleUpload = () => {
    if (!chapterId || jsonData.length === 0) {
      alert("Please select a course and chapter, and choose a valid JSON file.");
      return;
    }
  
    bulkUploadQuestions({
      variables: {
        chapterId,
        questions: jsonData
      }
    });
  };
  

  if (loading) return <LoadingSpinner/>;

  return (
    <div className='p-8 max-w-2xl mx-auto'>
      <h1 className='text-2xl font-bold mb-6'>Bulk Upload Questions</h1>

      {/* Course Dropdown */}
      <div className='mb-4'>
        <label className='block mb-2 font-semibold'>Select Course:</label>
        <select
          className='w-full border px-4 py-2'
          onChange={(e) => setCourseId(e.target.value)}
          value={courseId}
        >
          <option value="">-- Select Course --</option>
          {data?.getCourses.map(course => (
            <option key={course._id} value={course._id}>{course.title}</option>
          ))}
        </select>
      </div>

      {/* Chapter Dropdown */}
      <div className='mb-4'>
        <label className='block mb-2 font-semibold'>Select Chapter:</label>
        <select
          className='w-full border px-4 py-2'
          onChange={(e) => setChapterId(e.target.value)}
          value={chapterId}
          disabled={!courseId}
        >
          <option value="">-- Select Chapter --</option>
          {filteredChapters.map(ch => (
            <option key={ch._id} value={ch._id}>{ch.title}</option>
          ))}
        </select>
      </div>

      {/* File Upload */}
      <input type="file" accept=".json" onChange={handleFileChange} className='mb-4' />

      {/* Upload Button */}
      <button
        className='bg-blue-600 text-white px-4 py-2 rounded mb-4'
        onClick={handleUpload}
      >
        Upload
      </button>

      {/* Preview */}
      <div>
        <h2 className='text-lg font-semibold mb-2'>Preview</h2>
        <pre className='bg-gray-100 p-4 rounded max-h-64 overflow-auto'>
          {JSON.stringify(jsonData, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default BulkUploadQuestions;

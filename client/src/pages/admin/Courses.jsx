import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COURSE } from '../../graphql/mutations/courseMutation'; // update path as needed

const Courses = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [preview, setPreview] = useState(null);

  const [addCourse] = useMutation(ADD_COURSE);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result); // Base64 string
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addCourse({
        variables: {
          title,
          description,
          image: imageBase64,
        },
      });

      alert('Course added successfully!');
      // Reset form
      setTitle('');
      setDescription('');
      setImageBase64('');
      setPreview(null);
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-xl">
      <h2 className="text-xl font-semibold mb-4">Add Course</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Course Title"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Course Description"
          className="w-full p-2 border rounded"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          className="w-full p-2 border rounded"
          onChange={handleImageChange}
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="h-40 object-cover mt-2 rounded"
          />
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default Courses;

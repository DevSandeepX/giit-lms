import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_COURSE } from '../../graphql/mutations/courseMutation';
import { GET_COURSES } from '../../graphql/querys/getCourses';

const UpdateCourse = ({ course, onClose }) => {
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [image, setImage] = useState(course.image); // base64
  const [imagePreview, setImagePreview] = useState(course.image);

  const [updateCourse, { loading, error }] = useMutation(UPDATE_COURSE, {
    refetchQueries: [{ query: GET_COURSES }],
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // base64 string
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCourse({
        variables: {
          courseId: course._id,
          title,
          description,
          image,
        },
      });
      alert('Course updated successfully');
      onClose();
    } catch (err) {
      console.error('Error updating course:', err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg max-w-lg w-full shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Update Course</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Course Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Course Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 h-40 w-full object-cover rounded"
              />
            )}
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 border border-gray-300 rounded-lg text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="py-2 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Course'}
            </button>
          </div>
        </form>

        {error && <p className="text-red-500 text-center mt-4">Error: {error.message}</p>}
      </div>
    </div>
  );
};

export default UpdateCourse;

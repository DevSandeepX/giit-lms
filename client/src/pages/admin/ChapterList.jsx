import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_COURSES_WITH_CHAPTERS } from '../../graphql/querys/chapterQuery';
import { DELETE_CHAPTER, UPDATE_CHAPTER } from '../../graphql/mutations/chapterMutation';
import LoadingSpinner from '../../components/admin/LoadingSpinner';

const ChapterList = () => {
  const { loading, error, data, refetch } = useQuery(GET_COURSES_WITH_CHAPTERS);
  const [deleteChapter] = useMutation(DELETE_CHAPTER);
  const [updateChapter] = useMutation(UPDATE_CHAPTER);
  const [editState, setEditState] = useState({ chapterId: null, title: '' });

  const handleDelete = async (chapterId) => {
    await deleteChapter({ variables: { chapterId } });
    refetch();
  };

  const handleEditClick = (chapter) => {
    setEditState({ chapterId: chapter._id, title: chapter.title });
  };

  const handleUpdate = async () => {
    await updateChapter({
      variables: {
        chapterId: editState.chapterId,
        title: editState.title,
      },
    });
    setEditState({ chapterId: null, title: '' });
    refetch();
  };

  if (loading) return <LoadingSpinner/>;
  if (error) return <p>Error: {error.message}</p>;

  const courses = data?.getCourses || [];
  console.log(courses[0]?.chapters);
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">All Chapters</h2>
      {courses.map((course) => (
        <div key={course._id} className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-blue-700">📘 {course.title}</h3>
          <ul className="pl-5 ">
            {course.chapters?.map((chapter) => (
              <li key={chapter._id} className="flex justify-between items-center">
                {editState.chapterId === chapter._id ? (
                  <>
                    <input
                      value={editState.title}
                      onChange={(e) => setEditState({ ...editState, title: e.target.value })}
                      className="p-1 border rounded"
                    />
                    <button className="text-green-600 ml-2 border border-green-500 px-2 py-1  rounded" onClick={handleUpdate}>Save</button>
                  </>
                ) : (
                  <>
                    <span> {chapter.title}</span>
                    <div className="space-x-2">
                      <button className="text-sm text-blue-600 hover:underline border border-blue-500 px-2 py-1  rounded" onClick={() => handleEditClick(chapter)}>Edit</button>
                      <button className="text-sm text-red-600 hover:underline border border-red-500 px-2 py-1  rounded" onClick={() => handleDelete(chapter._id)}>Delete</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ChapterList;

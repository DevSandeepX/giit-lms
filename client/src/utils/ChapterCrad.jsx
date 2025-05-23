import React from 'react'
import { useNavigate } from 'react-router-dom'
const ChapterCrad = ({chapter}) => {
    const navigate = useNavigate()
    return (
        <div className="p-4 bg-white rounded-lg shadow-sm text-sm max-w-80">
            <p className="text-gray-900 text-xl font-semibold ml-2 mt-2">{chapter.title}</p>
            <button onClick={() => navigate(`/quiz/chapter/${chapter._id}`)} type="button" className="bg-indigo-500 mt-4 mb-3 ml-2 px-6 py-2 font-medium rounded text-white">Start Test</button>
        </div>
    )
}

export default ChapterCrad
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NotFound from '../../utils/NotFound';

// const questions = [
//   {
//     question: 'What is React?',
//     options: ['Library', 'Framework', 'Language', 'Database'],
//     correctAnswerIndex: 0,
//   },
//   {
//     question: 'What is useState?',
//     options: ['Hook', 'Component', 'Prop', 'Function'],
//     correctAnswerIndex: 0,
//   },
// ];

const QuizPage = ({ onFinish, questions }) => {
  const navigate = useNavigate()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionClick = (optionIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    const correctIndexes = questions.map((q) => q.correctAnswerIndex);
    onFinish(answers, correctIndexes);
  };

 if(questions && questions.length === 0){
  return <NotFound/>
 }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              answers[currentQuestionIndex] !== null
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {answers[currentQuestionIndex] !== null ? 'Answered' : 'Not Answered'}
          </span>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {currentQuestion.questionText}
        </h2>

        <div className="grid gap-3">
          {currentQuestion.options.map((opt, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              className={`border px-4 py-2 rounded text-left transition duration-200 ${
                answers[currentQuestionIndex] === index
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'hover:bg-blue-50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>

          {currentQuestionIndex === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;

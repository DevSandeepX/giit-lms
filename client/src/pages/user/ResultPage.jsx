import React from 'react';

const ResultPage = ({ username, userAnswers, correctAnswers, questions }) => {
  let score = 0;

  // Calculate the score by comparing user answers with correct answers
  correctAnswers.forEach((correct, i) => {
    if (userAnswers[i] === correct) score++;
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Results for <span className="text-blue-600">{username}</span>
        </h2>
        <p className="text-lg mb-6">
          You scored <span className="font-semibold">{score}</span> out of{' '}
          {correctAnswers.length}
        </p>

        <div className="space-y-5">
          {questions.map((q, i) => {
            const userAnswerIndex = userAnswers[i];
            const correctAnswerIndex = correctAnswers[i];

            // Get the user's selected answer text (or "Not Answered" if no answer)
            const userAnswerText =
              userAnswerIndex !== null && userAnswerIndex !== undefined
                ? q.options[userAnswerIndex]
                : 'Not Answered';

            // Get the correct answer text
            const correctAnswerText = q.options[correctAnswerIndex];

            // Check if the user's answer is correct
            const isCorrect = userAnswerIndex === correctAnswerIndex;

            return (
              <div key={i} className="bg-gray-50 border rounded p-4">
                <p className="font-semibold text-gray-800 mb-2">
                  Q{i + 1}: {q.questionText}
                </p>
                <p>
                  Your Answer:{' '}
                  <span
                    className={`font-medium ${
                      isCorrect ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {userAnswerText}
                  </span>
                </p>

                {/* If the answer is incorrect, show the correct answer */}
                {!isCorrect && (
                  <p>
                    Correct Answer:{' '}
                    <span className="text-green-700 font-medium">
                      {correctAnswerText}
                    </span>
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResultPage;

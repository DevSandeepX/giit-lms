import React, { useState } from 'react';
import NamePrompt from '../../components/user/NamePrompt';
import QuizPage from './QuizPage';
import { useParams, useLocation } from 'react-router-dom';
import ResultPage from './ResultPage';
import { GET_QUESTIONS_BY_COURSE, GET_QUESTIONS_BY_CHAPTER } from '../../graphql/querys/questionQuery';
import { useQuery } from '@apollo/client';
import LoadingSpinner from '../../components/admin/LoadingSpinner';
const QuizApp = () => {

  const [username, setUsername] = useState('');
  const [startQuiz, setStartQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  // console.log(courseId)
  
  // 👇 Define your questions here
const { id } = useParams();
  const location = useLocation();
  const isCourseQuiz = location.pathname.includes("/course/");

  const {
    loading: loadingCourse,
    error: errorCourse,
    data: courseData,
  } = useQuery(GET_QUESTIONS_BY_COURSE, {
    variables: { courseId: id },
    skip: !isCourseQuiz,
  });

  const {
    loading: loadingChapter,
    error: errorChapter,
    data: chapterData,
  } = useQuery(GET_QUESTIONS_BY_CHAPTER, {
    variables: { chapterId: id },
    skip: isCourseQuiz,
  });

  // console.log(chapterData)
  const loading = loadingCourse || loadingChapter;
  const error = errorCourse || errorChapter;
  const questions =
    courseData?.getQuestionsByCourse || chapterData?.getQuestionsByChapter || [];

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 p-4">Error Fetching Questions</div>;


  if (!username) {
    return <NamePrompt onSubmit={setUsername} />;
  }

  if (!startQuiz) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl mb-4">Hi {username}, ready to begin?</h2>
        <button
          onClick={() => setStartQuiz(true)}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  if (showResult) {
    return (
      <ResultPage
        username={username}
        userAnswers={userAnswers}
        correctAnswers={questions.map(q => q.correctAnswer)}
        questions={questions && questions}
      />
    );
  }

  return (
    <QuizPage
      questions={questions}
      onFinish={(answers) => {
        setUserAnswers(answers);
        setCorrectAnswers(questions.map(q => q.correctAnswer));
        setShowResult(true);
      }}
    />
  );
};

export default QuizApp;

import Question from '../models/Question.js';
import Chapter from '../models/Chapter.js';
import seedrandom from 'seedrandom';



function seededShuffle(array, seed) {
  const rng = seedrandom(seed);
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}



export const questionResolver = {
  Query: {
    // Get all questions
    getQuestions: async () => {
      return await Question.find().sort({ createdAt: -1 });
    },

    // Get questions by chapter ID
    getQuestionsByChapter: async (_, { chapterId }) => {
      return await Question.find({ chapterId }).sort({ createdAt: -1 }).limit(50);
    },

    // Get questions by course ID (via chapters)
    getQuestionsByCourse: async (_, { courseId }) => {
      const chapters = await Chapter.find({ courseId }).select('_id');
      const chapterIds = chapters.map(ch => ch._id);

      const allQuestions = await Question.find({ chapterId: { $in: chapterIds } }).select('_id');

      const today = new Date().toISOString().split('T')[0];
      const seed = `${courseId}-${today}`;
      // console.log("Seed for today:", seed);

      const shuffled = seededShuffle(allQuestions, seed).slice(0, 50);
      const selectedIds = shuffled.map(q => q._id);

      const finalQuestionsMap = await Question.find({ _id: { $in: selectedIds } })
        .then(questions => {
          const map = new Map();
          questions.forEach(q => map.set(q._id.toString(), q));
          return map;
        });

      const finalQuestions = selectedIds.map(id => finalQuestionsMap.get(id.toString()));

      return finalQuestions;
    }
  },

  Mutation: {
    addQuestion: async (_, { questionText, options, correctAnswer, chapterId }) => {
      const question = new Question({ questionText, options, correctAnswer, chapterId });
      await question.save();
      return question;
    },

    bulkUploadQuestions: async (_, { chapterId, questions }) => {
      try {
        const enrichedQuestions = questions.map(q => ({ ...q, chapterId }));
        await Question.insertMany(enrichedQuestions);
        return { success: true, message: "Questions uploaded successfully!" };
      } catch (error) {
        return { success: false, message: "Upload failed: " + error.message };
      }
    },
    

    updateQuestion: async (_, { questionId, questionText, options, correctAnswer }) => {
      return await Question.findByIdAndUpdate(
        questionId,
        { questionText, options, correctAnswer },
        { new: true }
      );
    },

    deleteQuestion: async (_, { questionId }) => {
      const deleted = await Question.findByIdAndDelete(questionId);
      return !!deleted;
    }
  }
};

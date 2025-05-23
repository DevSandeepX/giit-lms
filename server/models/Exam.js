import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  answers: [{
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    selectedAnswer: String
  }],
  score: Number,
  submittedAt: { type: Date, default: Date.now }
});

const Exam = mongoose.model('Exam', examSchema);
export default Exam;

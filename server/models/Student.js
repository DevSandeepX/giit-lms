import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  
//   password: { type: String, required: true },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  certificates: [{
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    fileUrl: String
  }]
});

const Student = mongoose.model('Student', studentSchema);
export default Student;

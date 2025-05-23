import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
// import Students from "../pages/admin/Students";
import Questions from "../pages/admin/Questions";
import Courses from "../pages/admin/Courses"
import Chapters from "../pages/admin/Chapters"
import CourseList from "../pages/admin/CourseList";
import ChapterList from "../pages/admin/ChapterList";
import ProtectedRoute from "../components/ProtectedRoute";
import NotFound from "../utils/NotFound";
import BulkUploadQuestions from "../pages/admin/BulkUploadQuestions";

const AdminRoutes = () => (
  <Routes>
    <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
      <Route path="courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
      <Route path="chapters" element={<ProtectedRoute><Chapters /></ProtectedRoute>} />
      <Route path="questions" element={<ProtectedRoute><Questions /></ProtectedRoute>} />
      <Route path="bulk-questions" element={<ProtectedRoute><BulkUploadQuestions /></ProtectedRoute>} />
      <Route path="course-list" element={<ProtectedRoute><CourseList /></ProtectedRoute>} />
      <Route path="chapter-list" element={<ProtectedRoute><ChapterList /></ProtectedRoute>} />

      <Route path="*" element={<NotFound/>} />
    </Route>
  </Routes>
);

export default AdminRoutes;

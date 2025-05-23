// resolvers/courseResolvers.js
import Course from '../models/Course.js';
import Chapter from '../models/Chapter.js';

export const courseResolvers = {
  Query: {
    // Get all courses
    getCourses: async () => {
      try {
        return await Course.find().sort({ createdAt: -1 }) || [];
      } catch (err) {
        console.error(err);
        throw new Error('Failed to fetch courses');
      }
    },

    // Get a course by ID
    getCourseById: async (_, { courseId }) => {
      try {
        const course = await Course.findById(courseId);
        if (!course) throw new Error('Course not found');
        return course;
      } catch (err) {
        console.error(err);
        throw new Error('Failed to fetch course');
      }
    },
  },

  Mutation: {
    // Add a new course
    addCourse: async (_, { title, description, image }) => {
      try {
        const newCourse = new Course({ title, description, image });
        await newCourse.save();
        return newCourse;
      } catch (err) {
        console.error(err);
        throw new Error('Failed to add course');
      }
    },

    // Update an existing course
    updateCourse: async (_, { courseId, title, description, image }) => {
      try {
        const updated = await Course.findByIdAndUpdate(
          courseId,
          { title, description, image },
          { new: true }
        );
        if (!updated) throw new Error('Course not found');
        return updated;
      } catch (err) {
        console.error(err);
        throw new Error('Failed to update course');
      }
    },

    // Delete a course
    deleteCourse: async (_, { courseId }) => {
      try {
        const result = await Course.findByIdAndDelete(courseId);
        return result ? true : false;
      } catch (err) {
        console.error(err);
        throw new Error('Failed to delete course');
      }
    },
  },

  // Nested resolver: Get chapters for a course
  Course: {
    chapters: async (parent) => {
      try {
        return await Chapter.find({ courseId: parent._id }).sort({ createdAt: -1 });
      } catch (err) {
        console.error(err);
        throw new Error('Failed to fetch chapters for course');
      }
    }
  }
};

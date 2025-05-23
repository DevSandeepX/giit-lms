import { Query } from "mongoose"
import Chapter from "../models/Chapter.js"

export const chapterResolver = {
    Query:{
        getChapters: async (_,{courseId}) => {
            try {
                return await Chapter.find(courseId)
            } catch (error) {
               console.error(error)
               throw new Error("Failed to fetch chapters") 
            }
        },


        getChapterById: async (_, { chapterId }) => {
            try {
              const chapter = await Chapter.findById(chapterId);
              if (!chapter) throw new Error('Chapter not found');
              return chapter;
            } catch (error) {
              console.error(error);
              throw new Error('Failed to fetch chapter');
            }
          },
    },

    Mutation: {
        // Add a chapter
        addChapter: async (_, { courseId, title }) => {
          try {
            const newChapter = new Chapter({ courseId, title });
            await newChapter.save();
            return newChapter;
          } catch (error) {
            console.error(error);
            throw new Error('Failed to add chapter');
          }
        },
    
        // Update a chapter
        updateChapter: async (_, { chapterId, title }) => {
          try {
            const updatedChapter = await Chapter.findByIdAndUpdate(
              chapterId,
              { title },
              { new: true }
            );
            if (!updatedChapter) throw new Error('Chapter not found');
            return updatedChapter;
          } catch (error) {
            console.error(error);
            throw new Error('Failed to update chapter');
          }
        },
    
        // Delete a chapter
        deleteChapter: async (_, { chapterId }) => {
          try {
            const deleted = await Chapter.findByIdAndDelete(chapterId);
            return !!deleted;
          } catch (error) {
            console.error(error);
            throw new Error('Failed to delete chapter');
          }
        },
      },



}
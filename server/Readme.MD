 [ mutation($title: String!, $description: String!){
  addCourse(title: $title, description: $description) {
    _id,
    title,
    description
  }
}


query{
  getCourses {
    _id,
    title,
    description,
    createdAt
  }
}


mutation {
  updateCourse(
    courseId: "6818e4d7e981d5605585e1b3",
    title: "Advanced JavaScript",
    description: "Deep dive into JS"
  ) {
    _id
    title
    description
  }
}

]





[
  mutation {
  addChapter(courseId: "6818e4d7e981d5605585e1b3", title: "New Chapter Title") {
    _id
    title
  }
}

query($chapterId: ID!){
  getChapterById(chapterId: $chapterId) {
    title
  }
}


mutation($chapterId: ID!, $title: String!){
  updateChapter(chapterId: $chapterId, title: $title) {
    title
  }
}
]






[
  {
    "questionText": "What is the capital of India?",
    "options": ["Mumbai", "Delhi", "Chennai", "Kolkata"],
    "correctAnswer": 1,
    "chapterId": "663f3a2b7db9f001cf9b72f5"
  },
  {
    "questionText": "Which language is used for React?",
    "options": ["Python", "C++", "JavaScript", "Java"],
    "correctAnswer": 2,
    "chapterId": "663f3a2b7db9f001cf9b72f5"
  }
]

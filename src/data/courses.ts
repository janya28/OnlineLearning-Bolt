import { Course } from '../types';

export const courses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript. This course is perfect for beginners who want to start their journey in web development.',
    instructor: 'Sarah Johnson',
    thumbnail: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Web Development',
    level: 'Beginner',
    duration: '8 weeks',
    enrolled: 1245,
    rating: 4.8,
    lessons: [
      {
        id: 'l1',
        title: 'Getting Started with HTML',
        description: 'Learn the basic structure of HTML documents and essential tags.',
        videoId: 'UB1O30fR-EE',
        duration: '15:30',
        quizzes: [
          {
            id: 'q1',
            title: 'HTML Basics Quiz',
            questions: [
              {
                id: 'q1-1',
                text: 'What does HTML stand for?',
                options: [
                  'Hyper Text Markup Language',
                  'Hyper Transfer Markup Language',
                  'High Tech Modern Language',
                  'Hybrid Text Machine Learning'
                ],
                correctAnswer: 0
              },
              {
                id: 'q1-2',
                text: 'Which tag is used for creating a paragraph in HTML?',
                options: ['<paragraph>', '<p>', '<para>', '<text>'],
                correctAnswer: 1
              }
            ]
          }
        ]
      },
      {
        id: 'l2',
        title: 'CSS Fundamentals',
        description: 'Learn how to style your HTML documents with CSS.',
        videoId: '1PnVor36_40',
        duration: '18:45',
        quizzes: [
          {
            id: 'q2',
            title: 'CSS Basics Quiz',
            questions: [
              {
                id: 'q2-1',
                text: 'What does CSS stand for?',
                options: [
                  'Cascading Style Sheets',
                  'Creative Style System',
                  'Computer Style Sheets',
                  'Colorful Style Sheets'
                ],
                correctAnswer: 0
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'React for Beginners',
    description: 'Master React.js fundamentals and build your first single-page application from scratch. Learn about components, state, props, and hooks.',
    instructor: 'Mark Anderson',
    thumbnail: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'JavaScript',
    level: 'Intermediate',
    duration: '6 weeks',
    enrolled: 987,
    rating: 4.9,
    lessons: [
      {
        id: 'l1',
        title: 'Introduction to React',
        description: 'Learn about the basic concepts of React and why it\'s so popular.',
        videoId: 'Tn6-PIqc4UM',
        duration: '20:15',
        quizzes: [
          {
            id: 'q1',
            title: 'React Basics Quiz',
            questions: [
              {
                id: 'q1-1',
                text: 'What is React?',
                options: [
                  'A JavaScript library for building user interfaces',
                  'A programming language',
                  'A database management system',
                  'A server-side framework'
                ],
                correctAnswer: 0
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'Data Science Essentials',
    description: 'Dive into the world of data science with Python, pandas, and visualization tools. Learn to analyze and interpret real-world datasets.',
    instructor: 'Emma Roberts',
    thumbnail: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Data Science',
    level: 'Advanced',
    duration: '10 weeks',
    enrolled: 756,
    rating: 4.7,
    lessons: [
      {
        id: 'l1',
        title: 'Python for Data Science',
        description: 'Learn how to use Python for data analysis and visualization.',
        videoId: '_uQrJ0TkZlc',
        duration: '25:40',
        quizzes: []
      }
    ]
  }
];
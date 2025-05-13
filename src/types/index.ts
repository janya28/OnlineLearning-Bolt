// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

// Course Types
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  enrolled: number;
  rating: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoId: string; // YouTube video ID
  duration: string;
  quizzes: Quiz[];
}

// Quiz Types
export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

// Progress Types
export interface UserProgress {
  userId: string;
  courseId: string;
  completedLessons: string[];
  quizResults: QuizResult[];
  lastAccessed: string;
  completionPercentage: number;
}

export interface QuizResult {
  quizId: string;
  score: number;
  completed: boolean;
  attemptedAt: string;
}

// Enrollment Type
export interface Enrollment {
  userId: string;
  courseId: string;
  enrolledAt: string;
  status: 'active' | 'completed' | 'paused';
}
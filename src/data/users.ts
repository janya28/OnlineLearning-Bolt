import { User, UserProgress, Enrollment } from '../types';

export const users: User[] = [
  {
    id: 'u1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'u2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  }
];

// Mock user progress data
export const userProgress: UserProgress[] = [
  {
    userId: 'u1',
    courseId: '1',
    completedLessons: ['l1'],
    quizResults: [
      {
        quizId: 'q1',
        score: 90,
        completed: true,
        attemptedAt: '2023-05-15T14:30:00Z'
      }
    ],
    lastAccessed: '2023-05-15T15:00:00Z',
    completionPercentage: 50
  },
  {
    userId: 'u1',
    courseId: '2',
    completedLessons: [],
    quizResults: [],
    lastAccessed: '2023-05-10T09:15:00Z',
    completionPercentage: 0
  }
];

// Mock enrollment data
export const enrollments: Enrollment[] = [
  {
    userId: 'u1',
    courseId: '1',
    enrolledAt: '2023-05-01T10:00:00Z',
    status: 'active'
  },
  {
    userId: 'u1',
    courseId: '2',
    enrolledAt: '2023-05-08T14:30:00Z',
    status: 'active'
  },
  {
    userId: 'u2',
    courseId: '3',
    enrolledAt: '2023-04-20T11:15:00Z',
    status: 'active'
  }
];
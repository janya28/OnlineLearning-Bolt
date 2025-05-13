import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Course, UserProgress, Enrollment } from '../types';
import { courses } from '../data/courses';
import { userProgress, enrollments } from '../data/users';
import { useAuth } from './AuthContext';

interface CourseContextType {
  allCourses: Course[];
  enrolledCourses: Course[];
  enrollInCourse: (courseId: string) => void;
  getCourseById: (courseId: string) => Course | undefined;
  getUserProgress: (courseId: string) => UserProgress | undefined;
  updateProgress: (courseId: string, lessonId: string) => void;
  submitQuiz: (courseId: string, lessonId: string, quizId: string, score: number) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [allCourses] = useState<Course[]>(courses);
  const [userProgressState, setUserProgressState] = useState<UserProgress[]>(userProgress);
  const [enrollmentsState, setEnrollmentsState] = useState<Enrollment[]>(enrollments);

  // Get all courses the current user is enrolled in
  const enrolledCourses = currentUser 
    ? allCourses.filter(course => 
        enrollmentsState.some(e => 
          e.userId === currentUser.id && e.courseId === course.id
        )
      )
    : [];

  // Enroll current user in a course
  const enrollInCourse = (courseId: string) => {
    if (!currentUser) return;

    // Check if already enrolled
    const isEnrolled = enrollmentsState.some(
      e => e.userId === currentUser.id && e.courseId === courseId
    );

    if (isEnrolled) return;

    // Create new enrollment
    const newEnrollment: Enrollment = {
      userId: currentUser.id,
      courseId,
      enrolledAt: new Date().toISOString(),
      status: 'active'
    };

    // Create initial progress record
    const newProgress: UserProgress = {
      userId: currentUser.id,
      courseId,
      completedLessons: [],
      quizResults: [],
      lastAccessed: new Date().toISOString(),
      completionPercentage: 0
    };

    setEnrollmentsState([...enrollmentsState, newEnrollment]);
    setUserProgressState([...userProgressState, newProgress]);
  };

  // Get a course by ID
  const getCourseById = (courseId: string) => {
    return allCourses.find(course => course.id === courseId);
  };

  // Get progress for current user and specific course
  const getUserProgress = (courseId: string) => {
    if (!currentUser) return undefined;
    
    return userProgressState.find(
      p => p.userId === currentUser.id && p.courseId === courseId
    );
  };

  // Update progress when a lesson is completed
  const updateProgress = (courseId: string, lessonId: string) => {
    if (!currentUser) return;

    setUserProgressState(prev => {
      const userCourseProgress = prev.find(
        p => p.userId === currentUser.id && p.courseId === courseId
      );

      if (!userCourseProgress) {
        // Create new progress if not exists
        const course = getCourseById(courseId);
        if (!course) return prev;

        const totalLessons = course.lessons.length;
        const completedLessons = [lessonId];
        const completionPercentage = (completedLessons.length / totalLessons) * 100;

        const newProgress: UserProgress = {
          userId: currentUser.id,
          courseId,
          completedLessons,
          quizResults: [],
          lastAccessed: new Date().toISOString(),
          completionPercentage
        };

        return [...prev, newProgress];
      } else {
        // Update existing progress
        return prev.map(p => {
          if (p.userId === currentUser.id && p.courseId === courseId) {
            const course = getCourseById(courseId);
            if (!course) return p;

            const totalLessons = course.lessons.length;
            const updatedCompletedLessons = p.completedLessons.includes(lessonId)
              ? p.completedLessons
              : [...p.completedLessons, lessonId];
            
            const completionPercentage = (updatedCompletedLessons.length / totalLessons) * 100;

            return {
              ...p,
              completedLessons: updatedCompletedLessons,
              lastAccessed: new Date().toISOString(),
              completionPercentage
            };
          }
          return p;
        });
      }
    });
  };

  // Submit quiz result
  const submitQuiz = (courseId: string, lessonId: string, quizId: string, score: number) => {
    if (!currentUser) return;

    setUserProgressState(prev => {
      const userCourseProgress = prev.find(
        p => p.userId === currentUser.id && p.courseId === courseId
      );

      if (!userCourseProgress) {
        // Create new progress if not exists
        const course = getCourseById(courseId);
        if (!course) return prev;

        const quizResult = {
          quizId,
          score,
          completed: true,
          attemptedAt: new Date().toISOString()
        };

        const totalLessons = course.lessons.length;
        const completionPercentage = (1 / totalLessons) * 100;

        const newProgress: UserProgress = {
          userId: currentUser.id,
          courseId,
          completedLessons: [lessonId],
          quizResults: [quizResult],
          lastAccessed: new Date().toISOString(),
          completionPercentage
        };

        return [...prev, newProgress];
      } else {
        // Update existing progress
        return prev.map(p => {
          if (p.userId === currentUser.id && p.courseId === courseId) {
            const quizResultIndex = p.quizResults.findIndex(qr => qr.quizId === quizId);
            
            let updatedQuizResults = [...p.quizResults];
            if (quizResultIndex >= 0) {
              // Update existing quiz result
              updatedQuizResults[quizResultIndex] = {
                ...updatedQuizResults[quizResultIndex],
                score,
                completed: true,
                attemptedAt: new Date().toISOString()
              };
            } else {
              // Add new quiz result
              updatedQuizResults.push({
                quizId,
                score,
                completed: true,
                attemptedAt: new Date().toISOString()
              });
            }

            // Mark lesson as completed if not already
            const updatedCompletedLessons = p.completedLessons.includes(lessonId)
              ? p.completedLessons
              : [...p.completedLessons, lessonId];

            // Update completion percentage
            const course = getCourseById(courseId);
            if (!course) return p;
            
            const totalLessons = course.lessons.length;
            const completionPercentage = (updatedCompletedLessons.length / totalLessons) * 100;

            return {
              ...p,
              completedLessons: updatedCompletedLessons,
              quizResults: updatedQuizResults,
              lastAccessed: new Date().toISOString(),
              completionPercentage
            };
          }
          return p;
        });
      }
    });
  };

  return (
    <CourseContext.Provider value={{
      allCourses,
      enrolledCourses,
      enrollInCourse,
      getCourseById,
      getUserProgress,
      updateProgress,
      submitQuiz
    }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};
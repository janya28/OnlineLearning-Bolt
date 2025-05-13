import React, { useEffect, useState } from 'react';
import { useCourses } from '../context/CourseContext';
import Button from '../components/ui/Button';
import VideoPlayer from '../components/lessons/VideoPlayer';
import QuizForm from '../components/quiz/QuizForm';
import { ChevronLeft, ChevronRight, List, CheckCircle } from 'lucide-react';

interface LessonPageProps {
  courseId: string;
  lessonId: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

const LessonPage: React.FC<LessonPageProps> = ({ courseId, lessonId, onNavigate }) => {
  const { getCourseById, updateProgress, submitQuiz } = useCourses();
  const [showQuiz, setShowQuiz] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const course = getCourseById(courseId);
  if (!course) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900">Course not found</h2>
        <Button
          variant="primary"
          className="mt-6"
          onClick={() => onNavigate('courses')}
        >
          Browse Courses
        </Button>
      </div>
    );
  }
  
  const lessonIndex = course.lessons.findIndex(lesson => lesson.id === lessonId);
  if (lessonIndex === -1) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900">Lesson not found</h2>
        <Button
          variant="primary"
          className="mt-6"
          onClick={() => onNavigate('course', { courseId })}
        >
          Back to Course
        </Button>
      </div>
    );
  }
  
  const lesson = course.lessons[lessonIndex];
  const prevLesson = lessonIndex > 0 ? course.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < course.lessons.length - 1 ? course.lessons[lessonIndex + 1] : null;
  
  // Handle video completion
  const handleVideoEnd = () => {
    updateProgress(courseId, lessonId);
    
    // Show quiz if available
    if (lesson.quizzes.length > 0 && !showQuiz) {
      setShowQuiz(true);
    }
  };
  
  // Handle quiz submission
  const handleQuizSubmit = (score: number) => {
    if (lesson.quizzes.length > 0) {
      submitQuiz(courseId, lessonId, lesson.quizzes[0].id, score);
    }
  };
  
  // Navigate to another lesson
  const goToLesson = (id: string) => {
    setShowQuiz(false);
    onNavigate('lesson', { courseId, lessonId: id });
  };
  
  useEffect(() => {
    // Reset quiz state when lesson changes
    setShowQuiz(false);
  }, [lessonId]);
  
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Top Navigation */}
      <div className="bg-white border-b py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('course', { courseId })}
            className="text-gray-700"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Course
          </Button>
          
          <h1 className="text-lg font-semibold text-center text-gray-900 hidden md:block">
            {course.title}
          </h1>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-700 md:hidden"
          >
            <List className="w-5 h-5" />
          </Button>
        </div>
      </div>
      
      <div className="flex flex-grow">
        {/* Sidebar for lessons navigation */}
        <div 
          className={`
            fixed inset-y-0 left-0 z-30 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out 
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            md:relative md:translate-x-0 md:z-0 md:pt-0 pt-16
          `}
        >
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Course Content</h2>
          </div>
          
          <div className="overflow-y-auto h-full">
            <ul className="divide-y">
              {course.lessons.map((item, index) => {
                const isActive = item.id === lessonId;
                
                return (
                  <li key={item.id}>
                    <button
                      className={`w-full text-left px-4 py-3 flex items-start hover:bg-gray-50 transition-colors
                        ${isActive ? 'bg-blue-50 border-l-4 border-blue-500' : ''}
                      `}
                      onClick={() => {
                        goToLesson(item.id);
                        setIsSidebarOpen(false);
                      }}
                    >
                      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-700 mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      <div>
                        <p className={`font-medium ${isActive ? 'text-blue-600' : 'text-gray-900'}`}>
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{item.duration}</p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-grow p-4 md:p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{lesson.title}</h1>
            
            <VideoPlayer 
              videoId={lesson.videoId} 
              onVideoEnd={handleVideoEnd}
            />
            
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-700">{lesson.description}</p>
            </div>
            
            {lesson.quizzes.length > 0 && showQuiz && (
              <div className="mt-10">
                <QuizForm
                  questions={lesson.quizzes[0].questions}
                  onSubmit={handleQuizSubmit}
                />
              </div>
            )}
            
            {/* Lesson navigation */}
            <div className="mt-16 flex justify-between items-center pt-6 border-t border-gray-200">
              {prevLesson ? (
                <Button
                  variant="outline"
                  onClick={() => goToLesson(prevLesson.id)}
                  className="flex items-center"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Previous Lesson
                </Button>
              ) : (
                <div></div>
              )}
              
              {nextLesson ? (
                <Button
                  variant="primary"
                  onClick={() => goToLesson(nextLesson.id)}
                  className="flex items-center"
                >
                  Next Lesson
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => onNavigate('course', { courseId })}
                  className="flex items-center"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Complete Course
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default LessonPage;
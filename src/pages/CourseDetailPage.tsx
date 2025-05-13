import React, { useState } from 'react';
import { useCourses } from '../context/CourseContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import { Star, Clock, Users, BookOpen, PlayCircle, CheckCircle } from 'lucide-react';

interface CourseDetailPageProps {
  courseId: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ courseId, onNavigate }) => {
  const { getCourseById, enrollInCourse, getUserProgress, enrolledCourses } = useCourses();
  const { isAuthenticated } = useAuth();
  const [isEnrolling, setIsEnrolling] = useState(false);
  
  const course = getCourseById(courseId);
  if (!course) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900">Course not found</h2>
        <p className="mt-2 text-gray-600">The course you're looking for doesn't exist or has been removed.</p>
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
  
  const isEnrolled = enrolledCourses.some(c => c.id === courseId);
  const progress = getUserProgress(courseId);
  
  const handleEnroll = () => {
    if (!isAuthenticated) {
      onNavigate('login');
      return;
    }
    
    setIsEnrolling(true);
    setTimeout(() => {
      enrollInCourse(courseId);
      setIsEnrolling(false);
    }, 600);
  };
  
  const handleStartLearning = () => {
    const firstLessonId = course.lessons[0].id;
    onNavigate('lesson', { courseId, lessonId: firstLessonId });
  };
  
  const handleContinueLearning = () => {
    if (!progress || progress.completedLessons.length === 0) {
      // If no progress or no completed lessons, start from the first lesson
      handleStartLearning();
      return;
    }
    
    // Find the next uncompleted lesson
    const nextLessonIndex = course.lessons.findIndex(
      lesson => !progress.completedLessons.includes(lesson.id)
    );
    
    if (nextLessonIndex === -1) {
      // If all lessons are completed, go to the first lesson
      handleStartLearning();
    } else {
      // Navigate to the next uncompleted lesson
      onNavigate('lesson', { courseId, lessonId: course.lessons[nextLessonIndex].id });
    }
  };
  
  return (
    <div className="space-y-8 pb-16">
      {/* Course Header */}
      <div className="relative bg-blue-700 text-white py-12 -mt-8 rounded-b-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-600 opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] opacity-10 bg-cover bg-center" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            <div className="w-full md:w-1/3">
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                {isEnrolled && (
                  <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-bold py-1 px-2 rounded">
                    Enrolled
                  </div>
                )}
              </div>
            </div>
            
            <div className="w-full md:w-2/3">
              <div className="flex items-center text-blue-100 text-sm mb-2">
                <span className="font-medium mr-2">{course.category}</span>
                <span className="mx-2">•</span>
                <span className="font-medium">{course.level}</span>
              </div>
              
              <h1 className="text-3xl font-bold mb-3">{course.title}</h1>
              
              <p className="text-blue-100 mb-6">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm mb-6">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1.5">{course.rating.toFixed(1)} rating</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 opacity-70" />
                  <span className="ml-1.5">{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-5 h-5 opacity-70" />
                  <span className="ml-1.5">{course.lessons.length} lessons</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 opacity-70" />
                  <span className="ml-1.5">{course.enrolled} students</span>
                </div>
              </div>
              
              <div className="flex items-center">
                <img 
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt={course.instructor}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium">Instructor</p>
                  <p className="text-lg font-semibold">{course.instructor}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Course Progress (if enrolled) */}
        {isEnrolled && progress && (
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Your Progress</h3>
                <div className="flex items-center mt-2">
                  <div className="w-full max-w-md bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progress.completionPercentage}%` }}
                    ></div>
                  </div>
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    {Math.round(progress.completionPercentage)}% complete
                  </span>
                </div>
              </div>
              
              <Button
                variant="primary"
                onClick={handleContinueLearning}
              >
                Continue Learning
              </Button>
            </div>
          </div>
        )}
        
        {/* Course Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>
            
            <div className="border border-gray-200 rounded-xl divide-y">
              {course.lessons.map((lesson, index) => {
                const isCompleted = progress?.completedLessons.includes(lesson.id);
                
                return (
                  <div 
                    key={lesson.id}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div 
                      className="flex items-start cursor-pointer"
                      onClick={() => isEnrolled ? onNavigate('lesson', { courseId, lessonId: lesson.id }) : null}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-green-500 mt-0.5" />
                      ) : (
                        <PlayCircle className="w-6 h-6 text-blue-500 mt-0.5" />
                      )}
                      
                      <div className="ml-3 flex-grow">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {index + 1}. {lesson.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">{lesson.description}</p>
                          </div>
                          <span className="text-sm text-gray-500 ml-4">{lesson.duration}</span>
                        </div>
                        
                        {lesson.quizzes.length > 0 && (
                          <div className="mt-2 flex items-center">
                            <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-0.5 rounded">
                              Quiz included
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="w-full lg:w-1/3">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">
              <div className="text-center">
                {isEnrolled ? (
                  <>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      You're enrolled in this course
                    </h3>
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      onClick={handleContinueLearning}
                    >
                      Continue Learning
                    </Button>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Join this course today
                    </h3>
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      onClick={handleEnroll}
                      disabled={isEnrolling}
                    >
                      {isEnrolling ? 'Enrolling...' : 'Enroll Now - Free'}
                    </Button>
                  </>
                )}
              </div>
              
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h4 className="font-medium text-gray-900 mb-3">This course includes:</h4>
                <ul className="space-y-2">
                  <CourseFeature icon={<BookOpen className="w-5 h-5" />} text={`${course.lessons.length} lessons`} />
                  <CourseFeature icon={<Clock className="w-5 h-5" />} text={`${course.duration} of content`} />
                  <CourseFeature icon={<CheckCircle className="w-5 h-5" />} text="Quizzes & assessments" />
                  <CourseFeature icon={<Users className="w-5 h-5" />} text="Community support" />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CourseFeatureProps {
  icon: React.ReactNode;
  text: string;
}

const CourseFeature: React.FC<CourseFeatureProps> = ({ icon, text }) => {
  return (
    <li className="flex items-center text-gray-700">
      <span className="text-blue-500 mr-2">{icon}</span>
      <span>{text}</span>
    </li>
  );
};

export default CourseDetailPage;
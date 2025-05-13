import React from 'react';
import { useCourses } from '../context/CourseContext';
import { useAuth } from '../context/AuthContext';
import ProgressCard from '../components/dashboard/ProgressCard';
import { BookOpen, Award, Clock } from 'lucide-react';
import Button from '../components/ui/Button';

interface DashboardPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const { enrolledCourses, getUserProgress } = useCourses();
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900">Please log in to view your dashboard</h2>
        <Button
          variant="primary"
          className="mt-6"
          onClick={() => onNavigate('login')}
        >
          Login
        </Button>
      </div>
    );
  }
  
  const hasEnrolledCourses = enrolledCourses.length > 0;
  
  // Calculate overall stats
  let completedLessons = 0;
  let totalLessons = 0;
  let completedCourses = 0;
  
  enrolledCourses.forEach(course => {
    const progress = getUserProgress(course.id);
    totalLessons += course.lessons.length;
    if (progress) {
      completedLessons += progress.completedLessons.length;
      if (progress.completionPercentage === 100) {
        completedCourses++;
      }
    }
  });
  
  const overallProgress = totalLessons > 0 
    ? Math.round((completedLessons / totalLessons) * 100)
    : 0;
  
  return (
    <div className="space-y-10 pb-16">
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-8 md:py-12 rounded-xl overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-shrink-0">
              <img 
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white/30"
              />
            </div>
            
            <div>
              <h1 className="text-3xl font-bold">Hello, {currentUser.name}!</h1>
              <p className="mt-2 text-blue-100">
                {hasEnrolledCourses 
                  ? `Track your progress across ${enrolledCourses.length} enrolled courses`
                  : 'Explore courses to start your learning journey'}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {hasEnrolledCourses ? (
        <>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Learning Stats</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard 
                title="Overall Progress" 
                value={`${overallProgress}%`}
                icon={<BookOpen className="w-6 h-6 text-blue-600" />}
                description={`${completedLessons} of ${totalLessons} lessons completed`}
                progressValue={overallProgress}
              />
              <StatCard 
                title="Courses Completed" 
                value={`${completedCourses}`}
                icon={<Award className="w-6 h-6 text-blue-600" />}
                description={`Out of ${enrolledCourses.length} enrolled courses`}
                progressValue={enrolledCourses.length > 0 ? (completedCourses / enrolledCourses.length) * 100 : 0}
              />
              <StatCard 
                title="Learning Time" 
                value={`${completedLessons * 10}m`}
                icon={<Clock className="w-6 h-6 text-blue-600" />}
                description="Total time spent learning"
              />
            </div>
          </section>
          
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Your Courses</h2>
              <Button
                variant="outline"
                onClick={() => onNavigate('courses')}
              >
                Browse More Courses
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map(course => {
                const progress = getUserProgress(course.id);
                if (!progress) return null;
                
                return (
                  <ProgressCard
                    key={course.id}
                    course={course}
                    progress={progress}
                    onContinue={(courseId) => onNavigate('course', { courseId })}
                  />
                );
              })}
            </div>
          </section>
        </>
      ) : (
        <div className="text-center py-16">
          <BookOpen className="w-16 h-16 text-blue-100 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            You haven't enrolled in any courses yet
          </h2>
          <p className="text-gray-600 mb-8">
            Explore our course catalog to find the perfect courses for your learning journey
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => onNavigate('courses')}
          >
            Browse Courses
          </Button>
        </div>
      )}
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
  progressValue?: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, description, progressValue }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-700">{title}</h3>
        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
          {icon}
        </div>
      </div>
      
      <div className="mb-2">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
      </div>
      
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      
      {progressValue !== undefined && (
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressValue}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
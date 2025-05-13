import React from 'react';
import CourseList from '../components/courses/CourseList';
import { useCourses } from '../context/CourseContext';
import { useAuth } from '../context/AuthContext';

interface CoursesPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

const CoursesPage: React.FC<CoursesPageProps> = ({ onNavigate }) => {
  const { allCourses, enrolledCourses } = useCourses();
  const { isAuthenticated } = useAuth();
  
  // Get IDs of enrolled courses for highlighting in the list
  const enrolledCourseIds = enrolledCourses.map(course => course.id);
  
  return (
    <div className="space-y-10 pb-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Explore Our Courses</h1>
        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
          Browse our selection of high-quality courses taught by industry experts
        </p>
      </div>
      
      {isAuthenticated && enrolledCourses.length > 0 && (
        <section className="bg-gray-50 py-10 rounded-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Your Enrolled Courses</h2>
              <p className="text-gray-600 mt-1">Continue learning where you left off</p>
            </div>
            
            <CourseList
              courses={enrolledCourses}
              enrolledCourseIds={enrolledCourseIds}
              onViewCourse={(courseId) => onNavigate('course', { courseId })}
            />
          </div>
        </section>
      )}
      
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">All Courses</h2>
          <p className="text-gray-600 mt-1">Find the perfect course to enhance your skills</p>
        </div>
        
        <CourseList
          courses={allCourses}
          enrolledCourseIds={enrolledCourseIds}
          onViewCourse={(courseId) => onNavigate('course', { courseId })}
        />
      </section>
    </div>
  );
};

export default CoursesPage;
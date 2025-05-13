import React from 'react';
import { BookOpen, CheckCircle, Users, Award } from 'lucide-react';
import Button from '../components/ui/Button';
import CourseList from '../components/courses/CourseList';
import { courses } from '../data/courses';
import { useAuth } from '../context/AuthContext';

interface HomePageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { isAuthenticated } = useAuth();
  
  // Only show the first 3 courses on homepage
  const featuredCourses = courses.slice(0, 3);
  
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-700 to-blue-500 text-white py-20 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] opacity-20 bg-cover bg-center" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">
              Learn Without Limits
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
              Start, switch, or advance your career with courses from world-class instructors
              and hands-on learning experiences.
            </p>
            <div className="pt-4">
              <Button
                variant="primary"
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50"
                onClick={() => onNavigate('courses')}
              >
                Explore Courses
              </Button>
              
              {!isAuthenticated && (
                <Button
                  variant="outline"
                  size="lg"
                  className="ml-4 border-white text-white hover:bg-white/10"
                  onClick={() => onNavigate('signup')}
                >
                  Join for Free
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Courses</h2>
            <p className="mt-2 text-lg text-gray-600">
              Discover our most popular courses for all skill levels
            </p>
          </div>
          <Button
            variant="outline"
            className="mt-4 md:mt-0"
            onClick={() => onNavigate('courses')}
          >
            View All Courses
          </Button>
        </div>
        
        <CourseList
          courses={featuredCourses}
          onViewCourse={(courseId) => onNavigate('course', { courseId })}
        />
      </section>
      
      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose LearnHub</h2>
          <p className="mt-2 text-lg text-gray-600 max-w-3xl mx-auto">
            We've designed an innovative learning platform that puts you in control of your education
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <BenefitCard
            icon={<BookOpen className="h-8 w-8 text-blue-600" />}
            title="Quality Content"
            description="Expert-led courses with detailed explanations, real-world examples, and practical exercises."
          />
          <BenefitCard
            icon={<CheckCircle className="h-8 w-8 text-blue-600" />}
            title="Track Progress"
            description="Monitor your learning journey with intuitive progress tracking and achievement milestones."
          />
          <BenefitCard
            icon={<Award className="h-8 w-8 text-blue-600" />}
            title="Earn Certificates"
            description="Receive recognized certificates upon course completion to showcase your skills."
          />
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="bg-gray-50 py-16 rounded-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatCard number="500+" label="Courses" />
            <StatCard number="50K+" label="Students" />
            <StatCard number="200+" label="Instructors" />
            <StatCard number="95%" label="Satisfaction" />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl overflow-hidden shadow-xl">
          <div className="px-6 py-12 md:p-12 text-center md:text-left md:flex md:items-center md:justify-between">
            <div className="md:flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Ready to start learning?
              </h2>
              <p className="mt-2 text-teal-100">
                Join thousands of students already learning on our platform.
              </p>
            </div>
            <div className="mt-8 md:mt-0 md:ml-8">
              <Button
                variant="primary"
                size="lg"
                className="bg-white text-teal-600 hover:bg-teal-50"
                onClick={() => isAuthenticated ? onNavigate('courses') : onNavigate('signup')}
              >
                {isAuthenticated ? 'Browse Courses' : 'Sign Up Free'}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md hover:-translate-y-1">
      <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

interface StatCardProps {
  number: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ number, label }) => {
  return (
    <div>
      <div className="text-4xl font-bold text-blue-600">{number}</div>
      <div className="text-gray-500 mt-1">{label}</div>
    </div>
  );
};

export default HomePage;
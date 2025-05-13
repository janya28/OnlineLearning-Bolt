import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import LessonPage from './pages/LessonPage';
import DashboardPage from './pages/DashboardPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import { AuthProvider } from './context/AuthContext';
import { CourseProvider } from './context/CourseContext';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [params, setParams] = useState<Record<string, string>>({});

  const handleNavigate = (page: string, newParams: Record<string, string> = {}) => {
    setCurrentPage(page);
    setParams(newParams);
    window.scrollTo(0, 0);
  };

  // Pages that should have full height and not show the footer
  const fullHeightPages = ['lesson', 'login', 'signup'];
  const showFooter = !fullHeightPages.includes(currentPage);

  // Render the current page based on the route
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'courses':
        return <CoursesPage onNavigate={handleNavigate} />;
      case 'course':
        return <CourseDetailPage courseId={params.courseId} onNavigate={handleNavigate} />;
      case 'lesson':
        return (
          <LessonPage 
            courseId={params.courseId} 
            lessonId={params.lessonId} 
            onNavigate={handleNavigate} 
          />
        );
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} />;
      case 'login':
        return <AuthPage type="login" onNavigate={handleNavigate} />;
      case 'signup':
        return <AuthPage type="signup" onNavigate={handleNavigate} />;
      case 'profile':
        return <ProfilePage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <AuthProvider>
      <CourseProvider>
        <div className="flex flex-col min-h-screen bg-gray-50">
          {!['login', 'signup'].includes(currentPage) && (
            <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
          )}
          
          <main className={`flex-grow ${!['login', 'signup', 'lesson'].includes(currentPage) ? 'pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full' : ''}`}>
            {renderPage()}
          </main>
          
          {showFooter && <Footer />}
        </div>
      </CourseProvider>
    </AuthProvider>
  );
}

export default App;
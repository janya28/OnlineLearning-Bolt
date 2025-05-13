import React from 'react';
import AuthForm from '../components/auth/AuthForm';
import { BookOpen } from 'lucide-react';

interface AuthPageProps {
  type: 'login' | 'signup';
  onNavigate: (page: string) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ type, onNavigate }) => {
  const handleSuccess = () => {
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side with image and brand info */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-blue-600">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 flex flex-col justify-center px-12 py-12 text-white">
          <div className="flex items-center mb-8">
            <BookOpen className="h-10 w-10" />
            <span className="ml-3 text-2xl font-bold">LearnHub</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-6">
            {type === 'login' 
              ? 'Welcome back to your learning journey' 
              : 'Start your learning journey today'}
          </h1>
          
          <p className="text-xl text-blue-100 mb-8">
            {type === 'login'
              ? 'Log in to access your courses, track your progress, and continue learning.'
              : 'Join thousands of students learning new skills and advancing their careers.'}
          </p>
          
          <div className="space-y-6">
            <TestimonialCard 
              text="LearnHub helped me transition into a new career in just 3 months. The courses were comprehensive and engaging!"
              author="Michael Chen"
              role="Software Developer"
            />
          </div>
        </div>
      </div>
      
      {/* Right side with form */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center lg:hidden mb-6">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold">LearnHub</span>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900">
              {type === 'login' ? 'Log in to your account' : 'Create your account'}
            </h2>
            <p className="mt-3 text-gray-600">
              {type === 'login'
                ? "Enter your details below to access your account"
                : "Fill in your information to create an account"}
            </p>
          </div>
          
          <AuthForm type={type} onSuccess={handleSuccess} />
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              {type === 'login'
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                className="text-blue-600 font-medium hover:underline"
                onClick={() => onNavigate(type === 'login' ? 'signup' : 'login')}
              >
                {type === 'login' ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TestimonialCardProps {
  text: string;
  author: string;
  role: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ text, author, role }) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
      <p className="text-white mb-4">"{text}"</p>
      <div className="flex items-center">
        <div className="mr-3">
          <div className="font-medium">{author}</div>
          <div className="text-sm text-blue-200">{role}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { User, Mail, Award, BookOpen } from 'lucide-react';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const { currentUser, logout } = useAuth();
  const { enrolledCourses } = useCourses();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  
  if (!currentUser) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900">Please log in to view your profile</h2>
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user's profile
    setIsEditing(false);
  };
  
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 h-32"></div>
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end -mt-16 mb-6">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-24 h-24 rounded-full border-4 border-white object-cover"
            />
            <div className="mt-4 sm:mt-0 sm:ml-4 flex-grow">
              <h1 className="text-2xl font-bold text-gray-900">{currentUser.name}</h1>
              <p className="text-gray-600">{currentUser.email}</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Button
                variant={isEditing ? 'outline' : 'primary'}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>
          </div>
          
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="flex gap-3">
                <Button type="submit" variant="primary">
                  Save Changes
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-8">
                <InfoItem icon={<User className="w-5 h-5" />} label="Member since" value="May 2023" />
                <InfoItem icon={<BookOpen className="w-5 h-5" />} label="Enrolled courses" value={`${enrolledCourses.length}`} />
                <InfoItem icon={<Award className="w-5 h-5" />} label="Certificates" value="0" />
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
        
        <div className="space-y-6">
          <SettingsItem
            title="Email Notifications"
            description="Receive emails about your course progress and new content"
            control={<Toggle enabled={true} onChange={() => {}} />}
          />
          
          <SettingsItem
            title="Password"
            description="Change your password"
            control={
              <Button variant="outline" size="sm">
                Change Password
              </Button>
            }
          />
          
          <div className="pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              className="text-red-600 border-red-200 hover:bg-red-50"
              onClick={logout}
            >
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value }) => {
  return (
    <div className="flex items-center">
      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
        {icon}
      </div>
      <div className="ml-3">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );
};

interface SettingsItemProps {
  title: string;
  description: string;
  control: React.ReactNode;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ title, description, control }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100">
      <div className="mb-4 sm:mb-0">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div>
        {control}
      </div>
    </div>
  );
};

interface ToggleProps {
  enabled: boolean;
  onChange: () => void;
}

const Toggle: React.FC<ToggleProps> = ({ enabled, onChange }) => {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`
        relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
        transition-colors duration-200 ease-in-out focus:outline-none
        ${enabled ? 'bg-blue-600' : 'bg-gray-200'}
      `}
    >
      <span className="sr-only">Toggle</span>
      <span
        className={`
          pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
          transition duration-200 ease-in-out
          ${enabled ? 'translate-x-5' : 'translate-x-0'}
        `}
      />
    </button>
  );
};

export default ProfilePage;
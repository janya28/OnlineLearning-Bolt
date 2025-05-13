import React from 'react';
import { Star, Clock, Users, BookOpen } from 'lucide-react';
import { Course } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface CourseCardProps {
  course: Course;
  onViewCourse: (courseId: string) => void;
  isEnrolled?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  onViewCourse,
  isEnrolled = false
}) => {
  return (
    <Card 
      hover
      className="h-full flex flex-col"
      onClick={() => onViewCourse(course.id)}
    >
      <div className="relative">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        {isEnrolled && (
          <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold py-1 px-2 rounded">
            Enrolled
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-10">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium text-white">{course.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-blue-600">{course.category}</span>
          <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-600 font-medium">{course.level}</span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{course.description}</p>
        
        <div className="mt-auto space-y-3">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-1" />
              <span>{course.lessons.length} lessons</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>{course.enrolled}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt={course.instructor}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="ml-2 text-xs text-gray-500">{course.instructor}</span>
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onViewCourse(course.id);
              }}
            >
              {isEnrolled ? 'Continue' : 'View Course'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
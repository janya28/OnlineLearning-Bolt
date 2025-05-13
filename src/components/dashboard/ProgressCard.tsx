import React from 'react';
import { Course, UserProgress } from '../../types';
import Card, { CardBody } from '../ui/Card';
import { BookOpen, Clock } from 'lucide-react';
import Button from '../ui/Button';

interface ProgressCardProps {
  course: Course;
  progress: UserProgress;
  onContinue: (courseId: string) => void;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ course, progress, onContinue }) => {
  return (
    <Card hover className="h-full">
      <CardBody className="flex flex-col h-full">
        <div className="flex items-start gap-4">
          <img 
            src={course.thumbnail} 
            alt={course.title} 
            className="w-20 h-20 object-cover rounded"
          />
          <div className="flex-grow">
            <h3 className="text-md font-bold text-gray-900 line-clamp-1">{course.title}</h3>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Clock className="w-4 h-4 mr-1" />
              <span>{course.duration}</span>
              <span className="mx-2">•</span>
              <BookOpen className="w-4 h-4 mr-1" />
              <span>{course.lessons.length} lessons</span>
            </div>
            <p className="text-xs text-gray-600 mt-2 line-clamp-2">{course.description}</p>
          </div>
        </div>
        
        <div className="my-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-medium text-gray-700">Progress</span>
            <span className="text-blue-600">{Math.round(progress.completionPercentage)}%</span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress.completionPercentage}%` }}
            />
          </div>
        </div>
        
        <div className="mt-auto flex items-center justify-between text-sm text-gray-600">
          <div>
            <span className="text-gray-500">Last accessed: </span>
            <time dateTime={progress.lastAccessed}>
              {new Date(progress.lastAccessed).toLocaleDateString()}
            </time>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onContinue(course.id)}
          >
            Continue
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProgressCard;
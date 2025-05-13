import React, { useState } from 'react';
import { Question } from '../../types';
import Button from '../ui/Button';

interface QuizFormProps {
  questions: Question[];
  onSubmit: (score: number) => void;
}

const QuizForm: React.FC<QuizFormProps> = ({ questions, onSubmit }) => {
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerChange = (questionId: string, answerIndex: number) => {
    if (!submitted) {
      setAnswers({ ...answers, [questionId]: answerIndex });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (submitted) return;
    
    // Calculate score
    let correctAnswers = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const finalScore = Math.round((correctAnswers / questions.length) * 100);
    setScore(finalScore);
    setSubmitted(true);
    onSubmit(finalScore);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Quiz</h2>
      
      {submitted && (
        <div className={`mb-6 p-4 rounded-md ${score >= 70 ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'}`}>
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 bg-white">
              <span className="text-lg font-bold">{score}%</span>
            </div>
            <div>
              <h3 className="font-medium text-base">
                {score >= 70 ? 'Great job! You passed the quiz.' : 'Keep learning! Try again later.'}
              </h3>
              <p className="text-sm mt-1">
                You got {questions.filter(q => answers[q.id] === q.correctAnswer).length} out of {questions.length} questions correct.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={question.id} className={`mb-6 ${index !== 0 ? 'pt-6 border-t border-gray-200' : ''}`}>
            <h3 className="text-md font-medium text-gray-900 mb-3">
              {index + 1}. {question.text}
            </h3>
            
            <div className="space-y-2">
              {question.options.map((option, optIndex) => (
                <label 
                  key={optIndex}
                  className={`
                    flex items-center p-3 rounded-md border cursor-pointer transition-colors
                    ${submitted && optIndex === question.correctAnswer
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : submitted && answers[question.id] === optIndex && optIndex !== question.correctAnswer
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : answers[question.id] === optIndex
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:bg-gray-50'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={optIndex}
                    checked={answers[question.id] === optIndex}
                    onChange={() => handleAnswerChange(question.id, optIndex)}
                    className="hidden"
                    disabled={submitted}
                  />
                  <div className={`
                    w-5 h-5 rounded-full flex items-center justify-center mr-3 border
                    ${answers[question.id] === optIndex
                      ? submitted && optIndex === question.correctAnswer
                        ? 'border-green-500 bg-green-500'
                        : submitted
                          ? 'border-red-500 bg-red-500'
                          : 'border-blue-500 bg-blue-500'
                      : 'border-gray-400 bg-white'
                    }
                  `}>
                    {answers[question.id] === optIndex && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        
        {!submitted && (
          <Button
            type="submit"
            variant="primary"
            disabled={Object.keys(answers).length !== questions.length}
            className="mt-4"
          >
            Submit Answers
          </Button>
        )}
      </form>
    </div>
  );
};

export default QuizForm;
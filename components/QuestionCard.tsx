
import React from 'react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  selectedOption?: number;
  onSelect: (index: number) => void;
  showFeedback?: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, selectedOption, onSelect, showFeedback }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full uppercase">
          {question.category}
        </span>
        {question.isCommon && (
          <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full uppercase flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            High Probability
          </span>
        )}
      </div>
      
      <h3 className="text-xl font-bold text-gray-800 mb-6">{question.text}</h3>
      
      <div className="space-y-3">
        {question.options.map((option, idx) => {
          let variant = "border-gray-200 hover:border-blue-400 hover:bg-blue-50";
          if (showFeedback) {
            if (idx === question.correctAnswer) {
              variant = "bg-green-100 border-green-500 text-green-900";
            } else if (idx === selectedOption) {
              variant = "bg-red-100 border-red-500 text-red-900";
            } else {
              variant = "opacity-50 border-gray-200";
            }
          } else if (idx === selectedOption) {
            variant = "bg-blue-600 border-blue-600 text-white shadow-md";
          }

          return (
            <button
              key={idx}
              onClick={() => !showFeedback && onSelect(idx)}
              disabled={showFeedback}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all flex justify-between items-center ${variant}`}
            >
              <span className="font-medium">{option}</span>
              {showFeedback && idx === question.correctAnswer && (
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;

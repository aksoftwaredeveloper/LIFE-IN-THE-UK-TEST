
export interface Question {
  id: string;
  category: 'History' | 'Government' | 'Customs' | 'Values' | 'Society';
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  isCommon?: boolean;
}

export interface UserProgress {
  totalTestsTaken: number;
  averageScore: number;
  completedCategories: Record<string, number>;
  history: {
    date: string;
    score: number;
    passed: boolean;
  }[];
}

export type TestMode = 'Practice' | 'Mock' | 'Common40';

export interface TestState {
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, number>;
  startTime: number;
  isFinished: boolean;
}

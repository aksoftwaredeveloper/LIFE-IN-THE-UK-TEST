
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { LIFE_IN_UK_QUESTIONS, MOCK_TEST_COUNT, PASS_MARK } from './constants';
import { Question, TestMode, TestState, UserProgress } from './types';
import QuestionCard from './components/QuestionCard';
import ProgressBar from './components/ProgressBar';
import { explainQuestion } from './services/geminiService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const App: React.FC = () => {
  const [view, setView] = useState<'Home' | 'Test' | 'Result' | 'Stats'>('Home');
  const [testMode, setTestMode] = useState<TestMode>('Mock');
  const [testState, setTestState] = useState<TestState | null>(null);
  const [progress, setProgress] = useState<UserProgress>({
    totalTestsTaken: 0,
    averageScore: 0,
    completedCategories: {},
    history: []
  });
  
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isExplaining, setIsExplaining] = useState(false);

  // Load progress
  useEffect(() => {
    const saved = localStorage.getItem('britpass_progress');
    if (saved) setProgress(JSON.parse(saved));
  }, []);

  // Save progress
  useEffect(() => {
    localStorage.setItem('britpass_progress', JSON.stringify(progress));
  }, [progress]);

  const startTest = (mode: TestMode) => {
    let selectedQuestions: Question[] = [];
    if (mode === 'Common40') {
      selectedQuestions = LIFE_IN_UK_QUESTIONS.filter(q => q.isCommon).sort(() => Math.random() - 0.5).slice(0, 40);
    } else {
      selectedQuestions = [...LIFE_IN_UK_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, MOCK_TEST_COUNT);
    }

    setTestMode(mode);
    setTestState({
      questions: selectedQuestions,
      currentQuestionIndex: 0,
      answers: {},
      startTime: Date.now(),
      isFinished: false
    });
    setView('Test');
    setAiExplanation(null);
  };

  const handleSelectOption = (index: number) => {
    if (!testState) return;
    setTestState(prev => prev ? ({
      ...prev,
      answers: { ...prev.answers, [prev.currentQuestionIndex]: index }
    }) : null);
  };

  const nextQuestion = () => {
    if (!testState) return;
    if (testState.currentQuestionIndex < testState.questions.length - 1) {
      setTestState(prev => prev ? ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1 }) : null);
      setAiExplanation(null);
    } else {
      finishTest();
    }
  };

  const prevQuestion = () => {
    if (!testState || testState.currentQuestionIndex === 0) return;
    setTestState(prev => prev ? ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex - 1 }) : null);
    setAiExplanation(null);
  };

  const finishTest = () => {
    if (!testState) return;
    
    const correctCount = testState.questions.reduce((acc, q, idx) => {
      return acc + (testState.answers[idx] === q.correctAnswer ? 1 : 0);
    }, 0);

    const score = Math.round((correctCount / testState.questions.length) * 100);
    const passed = correctCount >= PASS_MARK;

    const newHistory = [...progress.history, { date: new Date().toLocaleDateString(), score, passed }];
    const avgScore = Math.round(newHistory.reduce((a, b) => a + b.score, 0) / newHistory.length);

    setProgress(prev => ({
      ...prev,
      totalTestsTaken: prev.totalTestsTaken + 1,
      averageScore: avgScore,
      history: newHistory
    }));

    setTestState(prev => prev ? ({ ...prev, isFinished: true }) : null);
    setView('Result');
  };

  const handleExplain = async () => {
    if (!testState) return;
    const q = testState.questions[testState.currentQuestionIndex];
    setIsExplaining(true);
    const explanation = await explainQuestion(q.text, q.options, q.options[q.correctAnswer]);
    setAiExplanation(explanation);
    setIsExplaining(false);
  };

  const currentQuestion = testState?.questions[testState.currentQuestionIndex];
  const isLastQuestion = testState?.currentQuestionIndex === (testState?.questions.length ?? 0) - 1;

  if (view === 'Home') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">B</div>
            <h1 className="text-xl font-extrabold tracking-tight text-gray-900">BritPass</h1>
          </div>
          <button 
            onClick={() => setView('Stats')}
            className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
          >
            Statistics
          </button>
        </header>

        <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
              Master the <span className="text-blue-600">Life in the UK</span> Test
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our targeted training platform focuses on the most common exam questions and provides AI explanations to help you pass with confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-start transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-6">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">High Impact 40</h3>
              <p className="text-gray-600 mb-8">The reported 40 most common questions found in 90% of actual exams. Start here for the best results.</p>
              <button 
                onClick={() => startTest('Common40')}
                className="w-full mt-auto bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-amber-200"
              >
                Start Common 40 Test
              </button>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-start transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Full Mock Exam</h3>
              <p className="text-gray-600 mb-8">A complete 24-question test simulating the official exam environment and timing.</p>
              <button 
                onClick={() => startTest('Mock')}
                className="w-full mt-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-blue-200"
              >
                Start Mock Test
              </button>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
             <div className="text-center">
               <div className="text-3xl font-black text-gray-900">{progress.totalTestsTaken}</div>
               <div className="text-sm text-gray-500 uppercase tracking-widest font-bold">Tests Taken</div>
             </div>
             <div className="text-center">
               <div className="text-3xl font-black text-gray-900">{progress.averageScore}%</div>
               <div className="text-sm text-gray-500 uppercase tracking-widest font-bold">Avg. Score</div>
             </div>
             <div className="text-center">
               <div className="text-3xl font-black text-green-600">{progress.history.filter(h => h.passed).length}</div>
               <div className="text-sm text-gray-500 uppercase tracking-widest font-bold">Passes</div>
             </div>
             <div className="text-center">
               <div className="text-3xl font-black text-red-600">{progress.history.filter(h => !h.passed).length}</div>
               <div className="text-sm text-gray-500 uppercase tracking-widest font-bold">Failures</div>
             </div>
          </div>
        </main>
      </div>
    );
  }

  if (view === 'Test' && testState && currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => setView('Home')} className="text-gray-400 hover:text-gray-600">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </button>
            <div>
              <h2 className="text-lg font-bold">{testMode === 'Common40' ? 'High Probability Test' : 'Full Mock Exam'}</h2>
              <p className="text-xs text-gray-500">Question {testState.currentQuestionIndex + 1} of {testState.questions.length}</p>
            </div>
          </div>
          <div className="text-lg font-mono font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded">
             {testState.answers[testState.currentQuestionIndex] !== undefined ? 'Answered' : 'Pending'}
          </div>
        </header>

        <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-8">
          <ProgressBar current={testState.currentQuestionIndex + 1} total={testState.questions.length} />
          
          <QuestionCard 
            question={currentQuestion}
            selectedOption={testState.answers[testState.currentQuestionIndex]}
            onSelect={handleSelectOption}
          />

          <div className="flex flex-col gap-4">
             <div className="flex justify-between items-center">
                <button 
                  onClick={prevQuestion}
                  disabled={testState.currentQuestionIndex === 0}
                  className="px-6 py-3 font-bold text-gray-600 bg-white border rounded-xl hover:bg-gray-50 disabled:opacity-30"
                >
                  Previous
                </button>
                <button 
                  onClick={nextQuestion}
                  disabled={testState.answers[testState.currentQuestionIndex] === undefined}
                  className={`px-10 py-3 font-bold rounded-xl transition-all shadow-lg ${isLastQuestion ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                >
                  {isLastQuestion ? 'Finish Test' : 'Next Question'}
                </button>
             </div>

             <div className="mt-8 border-t pt-8">
                <button 
                  onClick={handleExplain}
                  disabled={isExplaining}
                  className="flex items-center gap-2 text-blue-600 font-bold hover:underline group"
                >
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>
                  </div>
                  {isExplaining ? 'AI is thinking...' : 'Stuck? Ask AI Tutor for an explanation'}
                </button>

                {aiExplanation && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-blue-900 text-sm italic leading-relaxed">
                      {aiExplanation}
                    </p>
                  </div>
                )}
             </div>
          </div>
        </main>
      </div>
    );
  }

  if (view === 'Result' && testState) {
    const correctCount = testState.questions.reduce((acc, q, idx) => {
      return acc + (testState.answers[idx] === q.correctAnswer ? 1 : 0);
    }, 0);
    const passed = correctCount >= PASS_MARK;
    const score = Math.round((correctCount / testState.questions.length) * 100);

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">B</div>
            <h1 className="text-xl font-extrabold text-gray-900">BritPass</h1>
          </div>
          <button onClick={() => setView('Home')} className="text-blue-600 font-bold">Return Home</button>
        </header>

        <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
          <div className={`p-8 rounded-3xl shadow-xl text-center mb-12 ${passed ? 'bg-green-600' : 'bg-red-600'} text-white`}>
            <div className="inline-block p-4 bg-white/20 rounded-full mb-6">
               {passed ? (
                 <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               ) : (
                 <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               )}
            </div>
            <h2 className="text-4xl font-black mb-2">{passed ? 'Test Passed!' : 'Test Failed'}</h2>
            <p className="text-xl opacity-90 mb-6">You scored {correctCount} out of {testState.questions.length} ({score}%)</p>
            <div className="flex justify-center gap-4">
               <button 
                 onClick={() => startTest(testMode)}
                 className="px-8 py-3 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-colors"
               >
                 Retake Test
               </button>
               <button 
                onClick={() => setView('Home')}
                 className="px-8 py-3 bg-black/20 text-white font-bold rounded-xl hover:bg-black/30 transition-colors"
               >
                 Go Home
               </button>
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-6">Question Review</h3>
          <div className="space-y-6">
            {testState.questions.map((q, idx) => {
              const userAnswer = testState.answers[idx];
              const isCorrect = userAnswer === q.correctAnswer;
              
              return (
                <div key={idx} className={`p-6 rounded-2xl border-2 ${isCorrect ? 'border-green-100 bg-green-50/30' : 'border-red-100 bg-red-50/30'}`}>
                   <div className="flex items-start gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                         <h4 className="font-bold text-gray-900 mb-2">{q.text}</h4>
                         <div className="grid md:grid-cols-2 gap-2 text-sm">
                            <div className="p-2 rounded bg-white border border-gray-100">
                               <span className="text-gray-500 mr-2">Your Answer:</span>
                               <span className={`font-medium ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                 {userAnswer !== undefined ? q.options[userAnswer] : 'No answer'}
                               </span>
                            </div>
                            {!isCorrect && (
                              <div className="p-2 rounded bg-white border border-gray-100">
                                <span className="text-gray-500 mr-2">Correct Answer:</span>
                                <span className="font-medium text-green-600">{q.options[q.correctAnswer]}</span>
                              </div>
                            )}
                         </div>
                         <p className="mt-4 text-sm text-gray-600 leading-relaxed border-t pt-4">
                           <strong>Context:</strong> {q.explanation}
                         </p>
                      </div>
                   </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    );
  }

  if (view === 'Stats') {
    const data = progress.history.map((h, i) => ({
      test: i + 1,
      score: h.score,
    }));

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => setView('Home')} className="text-gray-400 hover:text-gray-600">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </button>
            <h2 className="text-lg font-bold">Your Progress</h2>
          </div>
        </header>

        <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
           <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-2xl shadow-sm border">
                 <div className="text-gray-500 text-sm font-bold uppercase mb-1">Pass Rate</div>
                 <div className="text-3xl font-black text-blue-600">
                    {progress.history.length > 0 
                      ? Math.round((progress.history.filter(h => h.passed).length / progress.history.length) * 100) 
                      : 0}%
                 </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border">
                 <div className="text-gray-500 text-sm font-bold uppercase mb-1">Current Streak</div>
                 <div className="text-3xl font-black text-amber-600">
                    {(() => {
                      let streak = 0;
                      for (let i = progress.history.length - 1; i >= 0; i--) {
                        if (progress.history[i].passed) streak++;
                        else break;
                      }
                      return streak;
                    })()}
                 </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border">
                 <div className="text-gray-500 text-sm font-bold uppercase mb-1">Average Score</div>
                 <div className="text-3xl font-black text-green-600">{progress.averageScore}%</div>
              </div>
           </div>

           <div className="bg-white p-8 rounded-3xl shadow-sm border mb-12">
              <h3 className="text-xl font-bold mb-8">Performance History</h3>
              <div className="h-64 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} />
                       <XAxis dataKey="test" label={{ value: 'Test Number', position: 'insideBottom', offset: -5 }} />
                       <YAxis label={{ value: 'Score %', angle: -90, position: 'insideLeft' }} domain={[0, 100]} />
                       <Tooltip />
                       <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={3} dot={{ fill: '#2563eb', r: 6 }} activeDot={{ r: 8 }} />
                    </LineChart>
                 </ResponsiveContainer>
              </div>
           </div>

           <div className="bg-white p-8 rounded-3xl shadow-sm border">
              <h3 className="text-xl font-bold mb-6">Recent Test Log</h3>
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="border-b">
                          <th className="pb-4 font-bold text-gray-500">Date</th>
                          <th className="pb-4 font-bold text-gray-500">Score</th>
                          <th className="pb-4 font-bold text-gray-500">Result</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y">
                       {progress.history.slice().reverse().map((h, i) => (
                          <tr key={i}>
                             <td className="py-4 text-gray-900 font-medium">{h.date}</td>
                             <td className="py-4 text-gray-900 font-medium">{h.score}%</td>
                             <td className="py-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${h.passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                   {h.passed ? 'Pass' : 'Fail'}
                                </span>
                             </td>
                          </tr>
                       ))}
                       {progress.history.length === 0 && (
                         <tr>
                            <td colSpan={3} className="py-8 text-center text-gray-400">No tests taken yet.</td>
                         </tr>
                       )}
                    </tbody>
                 </table>
              </div>
           </div>
        </main>
      </div>
    );
  }

  return null;
};

export default App;


import { Question } from './types';

export const COMMON_QUESTIONS_COUNT = 40;
export const MOCK_TEST_COUNT = 24;
export const PASS_MARK = 18; // 75%

export const LIFE_IN_UK_QUESTIONS: Question[] = [
  {
    id: '1',
    category: 'Values',
    text: "Which of the following is a fundamental principle of British life?",
    options: ["Individual liberty", "The right to a free car", "Free holidays", "Total state control"],
    correctAnswer: 0,
    explanation: "Fundamental principles include democracy, the rule of law, individual liberty, and mutual respect.",
    isCommon: true
  },
  {
    id: '2',
    category: 'History',
    text: "Which document limited the King's power in 1215?",
    options: ["The Bill of Rights", "The Magna Carta", "The Domesday Book", "The Reform Act"],
    correctAnswer: 1,
    explanation: "Magna Carta (Great Charter) established the principle that nobody, including the King, is above the law.",
    isCommon: true
  },
  {
    id: '3',
    category: 'Government',
    text: "How many members does the UK Parliament have in the House of Commons?",
    options: ["450", "550", "650", "750"],
    correctAnswer: 2,
    explanation: "There are currently 650 Members of Parliament (MPs) in the House of Commons.",
    isCommon: true
  },
  {
    id: '4',
    category: 'Customs',
    text: "When is Remembrance Day celebrated?",
    options: ["November 11th", "October 31st", "December 25th", "April 1st"],
    correctAnswer: 0,
    explanation: "Remembrance Day (November 11th) commemorates those who died in wars.",
    isCommon: true
  },
  {
    id: '5',
    category: 'History',
    text: "Who was the first female Prime Minister of the UK?",
    options: ["Theresa May", "Margaret Thatcher", "Mary Robinson", "Florence Nightingale"],
    correctAnswer: 1,
    explanation: "Margaret Thatcher was the UK's first female PM, serving from 1979 to 1990.",
    isCommon: true
  },
  {
    id: '6',
    category: 'Government',
    text: "What is the minimum age to stand for election as an MP?",
    options: ["16", "18", "21", "25"],
    correctAnswer: 1,
    explanation: "The minimum age to stand for election as an MP is 18.",
    isCommon: true
  },
  {
    id: '7',
    category: 'Society',
    text: "Which of these is a famous British landmark?",
    options: ["The Eiffel Tower", "The Colosseum", "Stonehenge", "Statue of Liberty"],
    correctAnswer: 2,
    explanation: "Stonehenge is a prehistoric monument in Wiltshire, England.",
    isCommon: true
  },
  {
    id: '8',
    category: 'History',
    text: "In which year did the Battle of Hastings take place?",
    options: ["1066", "1215", "1415", "1588"],
    correctAnswer: 0,
    explanation: "William of Normandy defeated King Harold at the Battle of Hastings in 1066.",
    isCommon: true
  },
  {
    id: '9',
    category: 'Government',
    text: "The monarch has the right to veto any law passed by Parliament.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation: "The monarch's role is ceremonial; they give 'Royal Assent' but do not veto laws in practice.",
    isCommon: true
  },
  {
    id: '10',
    category: 'Values',
    text: "Which of the following is NOT a responsibility of UK residents?",
    options: ["Look after yourself and your family", "Pay taxes", "Vote in every single election", "Respect the rights of others"],
    correctAnswer: 2,
    explanation: "Voting is a right, but it is not a legal responsibility to vote in every election.",
    isCommon: true
  },
  // Adding more mock questions to reach a decent pool
  {
    id: '11',
    category: 'History',
    text: "Who built the Tower of London?",
    options: ["Henry VIII", "William the Conqueror", "Elizabeth I", "Richard III"],
    correctAnswer: 1,
    explanation: "William the Conqueror began building the White Tower in the 1070s.",
    isCommon: true
  },
  {
    id: '12',
    category: 'Government',
    text: "What are 'Pressure Groups'?",
    options: ["Organizations that try to influence government policy", "A group of weightlifters", "A medical term for high blood pressure", "A type of weather system"],
    correctAnswer: 0,
    explanation: "Pressure groups are organizations that seek to influence government policy on behalf of a particular cause.",
    isCommon: true
  },
  {
    id: '13',
    category: 'Customs',
    text: "What is the capital city of Scotland?",
    options: ["Glasgow", "Edinburgh", "Aberdeen", "Dundee"],
    correctAnswer: 1,
    explanation: "Edinburgh is the capital of Scotland.",
    isCommon: true
  },
  {
    id: '14',
    category: 'History',
    text: "Which conflict involved the use of 'The Blitz'?",
    options: ["The First World War", "The Second World War", "The Napoleonic Wars", "The Crimean War"],
    correctAnswer: 1,
    explanation: "The Blitz was the sustained bombing of British cities by Germany during WWII.",
    isCommon: true
  },
  {
    id: '15',
    category: 'Government',
    text: "What is the 'Shadow Cabinet'?",
    options: ["A group of senior opposition MPs", "A collection of secret laws", "The Queen's private advisors", "The local council leaders"],
    correctAnswer: 0,
    explanation: "The Shadow Cabinet consists of senior members of the main opposition party who 'shadow' government ministers.",
    isCommon: true
  },
  {
    id: '16',
    category: 'History',
    text: "Sir Isaac Newton is famous for his work in which field?",
    options: ["Music", "Literature", "Science", "Politics"],
    correctAnswer: 2,
    explanation: "Sir Isaac Newton was a mathematician and physicist famous for his laws of motion and gravity.",
    isCommon: true
  },
  {
    id: '17',
    category: 'Society',
    text: "What is the largest ethnic minority group in the UK?",
    options: ["People of Indian descent", "People of Chinese descent", "People of African descent", "People of Pakistani descent"],
    correctAnswer: 0,
    explanation: "According to the census, people of Indian descent are the largest ethnic minority group in the UK.",
    isCommon: true
  },
  {
    id: '18',
    category: 'Government',
    text: "Who appoints the Prime Minister?",
    options: ["The Speaker", "The People", "The Monarch", "The House of Lords"],
    correctAnswer: 2,
    explanation: "The Monarch formally appoints the Prime Minister following a general election.",
    isCommon: true
  },
  {
    id: '19',
    category: 'Customs',
    text: "Which of these is a traditional British food?",
    options: ["Sushi", "Roast Beef", "Paella", "Croissants"],
    correctAnswer: 1,
    explanation: "Roast Beef and Yorkshire Pudding is a traditional British Sunday lunch.",
    isCommon: true
  },
  {
    id: '20',
    category: 'History',
    text: "Which English King was executed in 1649?",
    options: ["Charles I", "Henry VIII", "James I", "Richard II"],
    correctAnswer: 0,
    explanation: "Charles I was executed in 1649 following the English Civil War.",
    isCommon: true
  },
  {
    id: '21',
    category: 'Government',
    text: "What is the highest court in the UK?",
    options: ["High Court", "Magistrates Court", "The Supreme Court", "Crown Court"],
    correctAnswer: 2,
    explanation: "The Supreme Court is the final court of appeal in the UK for civil and criminal cases.",
    isCommon: true
  },
  {
    id: '22',
    category: 'Values',
    text: "What does the 'Rule of Law' mean?",
    options: ["Only the rich follow the law", "Everyone is equal before the law", "Laws can be ignored if they are old", "The Prime Minister makes the laws alone"],
    correctAnswer: 1,
    explanation: "The Rule of Law means that no one is above the law and everyone must obey it.",
    isCommon: true
  },
  {
    id: '23',
    category: 'History',
    text: "Who was the 'Iron Lady'?",
    options: ["Queen Victoria", "Boudicca", "Margaret Thatcher", "Emmeline Pankhurst"],
    correctAnswer: 2,
    explanation: "Margaret Thatcher was nicknamed the 'Iron Lady' for her uncompromising politics.",
    isCommon: true
  },
  {
    id: '24',
    category: 'Society',
    text: "What is the official name of the UK?",
    options: ["Great Britain", "England", "The United Kingdom of Great Britain and Northern Ireland", "The British Isles"],
    correctAnswer: 2,
    explanation: "The full official name is 'The United Kingdom of Great Britain and Northern Ireland'.",
    isCommon: true
  }
];

export interface IQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  image?: string;
}

export const questions: IQuestion[] = [
  {
    id: 1,
    question: "Complete the sequence: 2, 4, 8, 16, ...",
    options: ["24", "32", "30", "36"],
    correctAnswer: "32",
  },
  {
    id: 2,
    question:
      "Which number does not belong in the series? 2, 3, 5, 7, 11, 13, 14, 17, 19",
    options: ["3", "11", "14", "17"],
    correctAnswer: "14",
  },
  {
    id: 3,
    question:
      "If you rearrange the letters 'CIFAIPC', you would have the name of a:",
    options: ["City", "Animal", "Ocean", "Country"],
    correctAnswer: "Ocean",
  },
  {
    id: 4,
    question: "Which figure completes the pattern?",
    image: "/images/question-1.jpg",
    options: ["Figure A", "Figure B", "Figure C", "Figure D"],
    correctAnswer: "Figure B",
  },
  {
    id: 5,
    question:
      "What number should come next in this series? 1, 4, 9, 16, 25, ...",
    options: ["30", "36", "42", "49"],
    correctAnswer: "36",
  },
  {
    id: 6,
    question: "A is to Z as 1 is to:",
    options: ["26", "25", "24", "0"],
    correctAnswer: "26",
  },
  {
    id: 7,
    question: "Which word does not belong with the others?",
    options: ["Apple", "Banana", "Carrot", "Orange"],
    correctAnswer: "Carrot",
  },
  {
    id: 8,
    question: "Complete the analogy: Bird is to wing as fish is to:",
    options: ["Water", "Scales", "Fin", "Swim"],
    correctAnswer: "Fin",
  },
  {
    id: 9,
    question: "If all Zips are Zaps, and some Zaps are Zops, then:",
    options: [
      "All Zips are Zops",
      "Some Zips are Zops",
      "No Zips are Zops",
      "Cannot be determined",
    ],
    correctAnswer: "Some Zips are Zops",
  },
  {
    id: 10,
    question: "Which figure is the odd one out?",
    image: "/images/question-2.png",
    options: ["Figure A", "Figure B", "Figure C", "Figure D"],
    correctAnswer: "Figure C",
  },
  {
    id: 11,
    question: "What is the missing number? 7, 12, 19, 28, ..., 52",
    options: ["35", "39", "42", "45"],
    correctAnswer: "39",
  },
  {
    id: 12,
    question: "If ROAD is coded as URDG, then SWAN is coded as:",
    options: ["VXDQ", "VZDQ", "TXBO", "UXDQ"],
    correctAnswer: "VZDQ",
  },
  {
    id: 13,
    question: "Which shape would complete the pattern?",
    image: "/images/question-3.jpg",
    options: ["Circle", "Triangle", "Square", "Pentagon"],
    correctAnswer: "Triangle",
  },
  {
    id: 14,
    question:
      "If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?",
    options: ["5 minutes", "100 minutes", "20 minutes", "1 minute"],
    correctAnswer: "5 minutes",
  },
  {
    id: 15,
    question:
      "Which number should replace the question mark? 8, 27, 64, 125, ?",
    options: ["196", "216", "256", "343"],
    correctAnswer: "216",
  },
  {
    id: 16,
    question: "Complete the analogy: Book is to Reading as Fork is to:",
    options: ["Kitchen", "Eating", "Food", "Cooking"],
    correctAnswer: "Eating",
  },
  {
    id: 17,
    question:
      "If you flip a fair coin 5 times, what is the probability of getting exactly 3 heads?",
    options: ["5/16", "3/8", "1/2", "5/32"],
    correctAnswer: "5/16",
  },
  {
    id: 18,
    question: "Which word is the odd one out?",
    options: ["Swift", "Fast", "Quick", "Nimble"],
    correctAnswer: "Nimble",
  },
  {
    id: 19,
    question: "What comes next in the pattern? 1, 11, 21, 1211, 111221, ...",
    options: ["312211", "12111", "132231", "312111"],
    correctAnswer: "312211",
  },
  {
    id: 20,
    question:
      "If a = 1, b = 2, c = 3, etc., what does the sum of the values of the word 'INTELLIGENCE' equal?",
    options: ["112", "121", "120", "113"],
    correctAnswer: "120",
  },
  {
    id: 21,
    question: "Which figure completes the sequence?",
    image: "/images/question-4.png",
    options: ["Figure A", "Figure B", "Figure C", "Figure D"],
    correctAnswer: "Figure D",
  },
  {
    id: 22,
    question:
      "A train travels 360 km in 3 hours. How far will it travel in 5 hours at the same speed?",
    options: ["480 km", "540 km", "600 km", "720 km"],
    correctAnswer: "600 km",
  },
  {
    id: 23,
    question: "Which number does not belong? 2, 5, 10, 17, 26, 37, 50, 64",
    options: ["37", "50", "64", "26"],
    correctAnswer: "64",
  },
  {
    id: 24,
    question: "If PEACH is coded as 57, what is PLUM coded as?",
    options: ["44", "50", "54", "58"],
    correctAnswer: "50",
  },
  {
    id: 25,
    question: "What is the next number in the sequence? 3, 6, 18, 72, 360, ...",
    options: ["720", "1080", "1800", "2160"],
    correctAnswer: "2160",
  },
];

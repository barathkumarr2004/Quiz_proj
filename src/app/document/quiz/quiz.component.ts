import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnDestroy {
  questions = [
    { question: 'What does CPU stand for?', options: ['Central Processing Unit', 'Central Programming Unit', 'Central Performance Unit', 'Central Protocol Unit'], answer: 'Central Processing Unit' },
    { question: 'Which of the following is a programming language?', options: ['HTML', 'HTTP', 'FTP', 'Python'], answer: 'Python' },
    { question: 'What is the time complexity of binary search algorithm?', options: ['O(n)', 'O(n log n)', 'O(log n)', 'O(n^2)'], answer: 'O(log n)' },
    { question: 'What is the main purpose of an operating system?', options: ['To manage hardware resources', 'To compile programs', 'To design websites', 'To edit videos'], answer: 'To manage hardware resources' },
    { question: 'Which company developed the Java programming language?', options: ['Microsoft', 'Apple', 'Sun Microsystems', 'Google'], answer: 'Sun Microsystems' },
    { question: 'What is the primary key in a database?', options: ['A unique identifier for a record', 'A foreign key', 'A special character in SQL', 'An encryption key'], answer: 'A unique identifier for a record' },
    { question: 'Which data structure uses LIFO (Last In First Out) principle?', options: ['Queue', 'Stack', 'Tree', 'Graph'], answer: 'Stack' },
    { question: 'What does HTTP stand for?', options: ['HyperText Transfer Protocol', 'Hyperlink Text Transfer Protocol', 'HyperText Transmission Protocol', 'Hyperlink Transfer Protocol'], answer: 'HyperText Transfer Protocol' },
    { question: 'What is a null pointer exception in programming?', options: ['An error when a pointer is not assigned a value', 'An error when a variable exceeds its value', 'An error in loop execution', 'An error in conditional statements'], answer: 'An error when a pointer is not assigned a value' },
    { question: 'Which of the following is a NoSQL database?', options: ['MySQL', 'PostgreSQL', 'MongoDB', 'Oracle'], answer: 'MongoDB' },
    { question: 'What is the main use of CSS in web development?', options: ['To define the content structure', 'To style and layout web pages', 'To handle user input', 'To connect to a database'], answer: 'To style and layout web pages' },
    { question: 'Which sorting algorithm is the fastest in the average case?', options: ['Bubble Sort', 'Merge Sort', 'Quick Sort', 'Insertion Sort'], answer: 'Quick Sort' },
    { question: 'What does SQL stand for?', options: ['Structured Query Language', 'Simple Query Language', 'Standard Query Language', 'Sequential Query Language'], answer: 'Structured Query Language' },
    { question: 'Which programming paradigm focuses on data and functions as a single unit?', options: ['Procedural Programming', 'Functional Programming', 'Object-Oriented Programming', 'Logic Programming'], answer: 'Object-Oriented Programming' },
    { question: 'What is a function in programming?', options: ['A reusable block of code that performs a specific task', 'A data type', 'An operator', 'A database field'], answer: 'A reusable block of code that performs a specific task' },
    { question: 'Which of the following is an example of a dynamic programming language?', options: ['C++', 'Java', 'Python', 'Assembly'], answer: 'Python' },
    { question: 'What does the acronym LAN stand for?', options: ['Local Area Network', 'Large Area Network', 'Light Area Network', 'Logical Area Network'], answer: 'Local Area Network' },
    { question: 'Which of the following is used to uniquely identify each record in a table?', options: ['Foreign Key', 'Secondary Key', 'Primary Key', 'Candidate Key'], answer: 'Primary Key' },
    { question: 'What is the main difference between TCP and UDP?', options: ['TCP is connection-oriented; UDP is connectionless', 'TCP is for web traffic; UDP is for emails', 'TCP is faster; UDP is slower', 'TCP is for wireless; UDP is for wired connections'], answer: 'TCP is connection-oriented; UDP is connectionless' },
    { question: 'What is recursion in computer science?', options: ['A method where the solution depends on solutions to smaller instances of the same problem', 'A way to iterate over arrays', 'A type of variable declaration', 'A database management technique'], answer: 'A method where the solution depends on solutions to smaller instances of the same problem' }
  ];

  currentQuestion = 0;
  score = 0;
  selectedOption: string | null = null;
  timeLeft = 30; // 30 seconds for each question
  timerSubscription: Subscription | undefined;

  constructor(private router: Router) {
    this.startTimer();
  }

  startTimer() {
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.nextQuestion();
      }
    });
  }

  resetTimer() {
    this.timeLeft = 30;
  }

  selectOption(option: string) {
    this.selectedOption = option;
  }

  nextQuestion() {
    if (this.selectedOption === this.questions[this.currentQuestion].answer) {
      this.score++;
    }
    this.currentQuestion++;
    this.selectedOption = null;
    this.resetTimer();
    if (this.currentQuestion >= this.questions.length) {
      this.timerSubscription?.unsubscribe();
      this.router.navigate(['/result'], { state: { score: this.score, total: this.questions.length } });
    }
  }

  ngOnDestroy() {
    this.timerSubscription?.unsubscribe();
  }
}


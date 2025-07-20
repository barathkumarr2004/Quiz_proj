import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class GameComponent implements OnInit, OnDestroy {
  questions: any[] = [];
  currentQuestion: any;
  currentIndex: number = 0;
  combinedOptions: any[] = [];
  isLoading: boolean = true;
  score: number = 0;
  selectedOption: string = '';
  showResult: boolean = false;
  timer: any;
  timeLeft: number = 30;
  showFeedback: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getQuestions();
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  getQuestions() {
    const apiUrl = 'https://opentdb.com/api.php?amount=20&category=18';
    this.http.get(apiUrl).subscribe((response: any) => {
      this.questions = response.results;
      this.isLoading = false;
      this.setNextQuestion();
    });
  }

  setNextQuestion() {
    if (this.currentIndex < this.questions.length) {
      this.currentQuestion = this.questions[this.currentIndex];
      this.combinedOptions = this.shuffleOptions([
        this.currentQuestion.correct_answer,
        ...this.currentQuestion.incorrect_answers
      ]);
      this.selectedOption = '';
      this.timeLeft = 30;
      this.showFeedback = false;
      this.startTimer();
    } else {
      this.showResult = true;
    }
  }

  startTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        this.selectOption(''); // Move to next question if time runs out
      }
    }, 1000);
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.showFeedback = true;
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (option === this.currentQuestion.correct_answer) {
      this.score++;
    }
    setTimeout(() => this.nextQuestion(), 1000);
  }

  nextQuestion() {
    this.currentIndex++;
    this.setNextQuestion();
  }

  shuffleOptions(options: any[]): any[] {
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  }

  restartQuiz() {
    this.currentIndex = 0;
    this.score = 0;
    this.showResult = false;
    this.setNextQuestion();
  }
  
}

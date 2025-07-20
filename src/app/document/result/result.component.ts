import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
  score: number;
  total: number;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { score: number, total: number };
    this.score = state.score;
    this.total = state.total;
  }

  retryQuiz() {
    this.router.navigate(['/quiz']);
  }
}

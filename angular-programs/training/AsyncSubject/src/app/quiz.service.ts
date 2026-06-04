import { Injectable } from '@angular/core';
import { AsyncSubject, Observable } from 'rxjs';

export interface QuizAnswer {
  questionId: number;
  isCorrect: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private scoreSubject = new AsyncSubject<number>();
  private answers: QuizAnswer[] = [];
  private totalQuestions = 0;

  constructor() {}

  /**
   * Get the score observable. Subscribers will only receive 
   * the final score when the quiz is completed.
   */
  getScore(): Observable<number> {
    return this.scoreSubject.asObservable();
  }

  /**
   * Initialize a new quiz with a specified number of questions
   */
  startQuiz(totalQuestions: number): void {
    this.scoreSubject = new AsyncSubject<number>();
    this.answers = [];
    this.totalQuestions = totalQuestions;
  }

  /**
   * Submit an answer for a question.
   * Each answer is emitted via .next() but subscribers won't receive it yet.
   */
  submitAnswer(questionId: number, isCorrect: boolean): void {
    this.answers.push({ questionId, isCorrect });
    
    // Calculate current score
    const correctAnswers = this.answers.filter(a => a.isCorrect).length;
    const score = (correctAnswers / this.totalQuestions) * 100;
    
    // Emit the current score (but subscribers won't receive it until complete)
    this.scoreSubject.next(score);
  }

  /**
   * Finish the quiz and broadcast the final score to all subscribers.
   * Only when complete() is called will subscribers receive the last emitted value.
   */
  finishQuiz(): void {
    this.scoreSubject.complete();
  }

  /**
   * Get current number of submitted answers
   */
  getSubmittedCount(): number {
    return this.answers.length;
  }

  /**
   * Get total questions in the quiz
   */
  getTotalQuestions(): number {
    return this.totalQuestions;
  }
}

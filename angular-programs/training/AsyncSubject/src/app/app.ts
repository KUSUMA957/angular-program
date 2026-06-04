import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Quiz Score Collector - AsyncSubject Demo');
  
  quizStarted = signal(false);
  currentQuestion = signal(1);
  totalQuestions = signal(5);
  finalScore = signal<number | null>(null);
  scoreMessages = signal<string[]>([]);
  
  constructor(private quizService: QuizService) {}

  startQuiz(): void {
    this.quizStarted.set(true);
    this.currentQuestion.set(1);
    this.finalScore.set(null);
    this.scoreMessages.set(['Quiz started! Answer the questions...']);
    
    this.quizService.startQuiz(this.totalQuestions());
    
    // Subscribe to score - will only receive value when quiz completes
    this.quizService.getScore().subscribe({
      next: (score) => {
        this.finalScore.set(score);
        this.scoreMessages.update(msgs => [
          ...msgs,
          `🎉 Final Score Received: ${score.toFixed(2)}%`
        ]);
      },
      complete: () => {
        this.scoreMessages.update(msgs => [
          ...msgs,
          '✅ Quiz completed and score broadcasted!'
        ]);
      }
    });
  }

  submitAnswer(isCorrect: boolean): void {
    const questionNum = this.currentQuestion();
    this.quizService.submitAnswer(questionNum, isCorrect);
    
    this.scoreMessages.update(msgs => [
      ...msgs,
      `Question ${questionNum} answered: ${isCorrect ? '✓ Correct' : '✗ Incorrect'} (score not broadcasted yet)`
    ]);
    
    if (questionNum < this.totalQuestions()) {
      this.currentQuestion.update(q => q + 1);
    }
  }

  finishQuiz(): void {
    this.quizService.finishQuiz();
    this.scoreMessages.update(msgs => [
      ...msgs,
      '🏁 Quiz finished - broadcasting final score to all subscribers...'
    ]);
  }

  resetQuiz(): void {
    this.quizStarted.set(false);
    this.currentQuestion.set(1);
    this.finalScore.set(null);
    this.scoreMessages.set([]);
  }

  get canSubmitAnswer(): boolean {
    return this.currentQuestion() <= this.totalQuestions() && 
           this.quizService.getSubmittedCount() < this.totalQuestions();
  }

  get canFinish(): boolean {
    return this.quizService.getSubmittedCount() === this.totalQuestions() && 
           this.finalScore() === null;
  }
}

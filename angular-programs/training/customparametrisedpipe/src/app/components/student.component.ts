import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradePipe } from '../pipes/grade.pipe';
import { ResultPipe } from '../pipes/result.pipe';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, GradePipe, ResultPipe],
  template: `
    <div class="student-card">
      <h2>Student Performance</h2>
      
      <div class="grades-section">
        <h3>Grade Examples</h3>
        <p>Math: {{ mathMarks | grade:'letter' }}</p>
        <p>Science: {{ scienceMarks | grade:'word' }}</p>
        <p>English: {{ englishMarks | grade:'letter' }}</p>
        <p>History: {{ historyMarks | grade:'word' }}</p>
      </div>
      
      <div class="results-section">
        <h3>Result Examples</h3>
        <p>Math Result (Percentage): {{ mathMarks | result:totalMarks:'percentage' }}</p>
        <p>Science Result (Fraction): {{ scienceMarks | result:totalMarks:'fraction' }}</p>
        <p>English Result (Grade): {{ englishMarks | result:totalMarks:'grade' }}</p>
        <p>History Result (Default): {{ historyMarks | result:totalMarks }}</p>
      </div>
      
      <div class="overall-section">
        <h3>Overall Performance</h3>
        <p>Total Marks: {{ overallMarks | result:totalOverall:'percentage' }}</p>
        <p>Overall Grade: {{ overallMarks | grade:'letter' }}</p>
      </div>
    </div>
  `,
  styles: [`
    .student-card {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .grades-section, .results-section, .overall-section {
      margin: 20px 0;
      padding: 15px;
      background-color: #f8f9fa;
      border-radius: 6px;
    }
    
    h2, h3 {
      color: #2c3e50;
    }
    
    p {
      margin: 8px 0;
      font-family: 'Courier New', monospace;
    }
    
    .overall-section {
      background-color: #e8f5e8;
      border-left: 4px solid #27ae60;
    }
  `]
})
export class StudentComponent {
  mathMarks = 85;
  scienceMarks = 92;
  englishMarks = 78;
  historyMarks = 45;
  totalMarks = 100;
  
  overallMarks = 300; // Total of all subjects
  totalOverall = 400; // Maximum possible total
}

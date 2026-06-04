import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Student {
  id: number;
  name: string;
  age: number;
  grade: string;
  score: number;
  isActive: boolean;
}

@Component({
  selector: 'app-ng-classcomp',
  imports: [CommonModule],
  templateUrl: './ng-classcomp.html',
  styleUrl: './ng-classcomp.css',
})
export class NgClasscomp {
  currentColor: string = '';

  // Student list with sample data
  students: Student[] = [
    { id: 1, name: 'John Doe', age: 20, grade: 'A', score: 85, isActive: true },
    { id: 2, name: 'Jane Smith', age: 19, grade: 'B', score: 75, isActive: false },
    { id: 3, name: 'Mike Johnson', age: 21, grade: 'A', score: 92, isActive: true },
    { id: 4, name: 'Sarah Wilson', age: 18, grade: 'C', score: 65, isActive: true },
    { id: 5, name: 'David Brown', age: 22, grade: 'B', score: 78, isActive: false },
    { id: 6, name: 'Lisa Davis', age: 20, grade: 'A', score: 88, isActive: true }
  ];

  setColor(color: string) {
    this.currentColor = color;
  }

  // Method to get dynamic styles based on student data
  getStudentStyles(student: Student) {
    return {
      'background-color': this.getGradeColor(student.grade),
      'color': student.isActive ? '#000' : '#666',
      'font-weight': student.score >= 80 ? 'bold' : 'normal',
      'border-left': `5px solid ${this.getScoreColor(student.score)}`,
      'opacity': student.isActive ? '1' : '0.7',
      'transform': student.score >= 90 ? 'scale(1.02)' : 'scale(1)'
    };
  }

  // Get background color based on grade
  getGradeColor(grade: string): string {
    switch (grade) {
      case 'A': return '#e8f5e8';
      case 'B': return '#fff3cd';
      case 'C': return '#f8d7da';
      default: return '#f8f9fa';
    }
  }

  // Get border color based on score
  getScoreColor(score: number): string {
    if (score >= 90) return '#28a745';
    if (score >= 80) return '#17a2b8';
    if (score >= 70) return '#ffc107';
    return '#dc3545';
  }

  // Toggle student active status
  toggleStudentStatus(student: Student) {
    student.isActive = !student.isActive;
    
  }

  // Get progress bar styles with animation
  getProgressBarStyles(score: number) {
    return {
      'width': score + '%',
      'height': '100%',
      'background': this.getProgressGradient(score),
      'border-radius': '4px',
      'transition': 'all 0.5s ease',
      'position': 'absolute',
      'left': '0',
      'top': '0',
      'box-shadow': score >= 80 ? '0 0 8px rgba(40, 167, 69, 0.4)' : 'none'
    };
  }

  // Get gradient background for progress bar
  getProgressGradient(score: number): string {
    if (score >= 90) return 'linear-gradient(90deg, #28a745, #20c997)';
    if (score >= 80) return 'linear-gradient(90deg, #17a2b8, #6f42c1)';
    if (score >= 70) return 'linear-gradient(90deg, #ffc107, #fd7e14)';
    return 'linear-gradient(90deg, #dc3545, #e83e8c)';
  }
}

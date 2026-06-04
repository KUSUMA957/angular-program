import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'grade',
  standalone: true
})
export class GradePipe implements PipeTransform {
  transform(marks: number, gradeType: string = 'letter'): string {
    let grade = '';
    
    if (marks >= 90) {
      grade = gradeType === 'letter' ? 'A+' : 'Excellent';
    } else if (marks >= 80) {
      grade = gradeType === 'letter' ? 'A' : 'Very Good';
    } else if (marks >= 70) {
      grade = gradeType === 'letter' ? 'B' : 'Good';
    } else if (marks >= 60) {
      grade = gradeType === 'letter' ? 'C' : 'Average';
    } else if (marks >= 50) {
      grade = gradeType === 'letter' ? 'D' : 'Below Average';
    } else {
      grade = gradeType === 'letter' ? 'F' : 'Fail';
    }
    
    return `${marks} - ${grade}`;
  }
}

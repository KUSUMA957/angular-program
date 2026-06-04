import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'studentMarksFilter',
})
export class StudentMarksFilterPipe implements PipeTransform {
  
  transform(students: any[], filterType: string): any[] {
    if (!students || !filterType) {
      return students;
    }
    if (filterType === 'passed') {
      return students.filter(student => student.marks > 35);
    }
    if (filterType === 'failed') {
      return students.filter(student => student.marks < 35);
    }
    return students;
  }
}

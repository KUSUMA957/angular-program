import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students: { id: number, name: string }[] = [
  { id: 1, name: 'Kiran' },
  { id: 2, name: 'Asha' },
  { id: 3, name: 'Rahul' }
];

  getStudents() {
    return this.students;
  }

  addStudent(name: string) {
    const newId = this.students.length + 1;
    this.students.push({ id: newId, name });
  }

  getStudentById(id: number) {
    return this.students.find(s => s.id === id);
  }
}
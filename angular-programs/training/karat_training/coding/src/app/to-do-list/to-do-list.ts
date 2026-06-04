import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface task {
  task_name: string;
  isCompleted: boolean;
}
@Component({
  selector: 'app-to-do-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.css',
})
export class ToDoList {
  tasks: task = {
    task_name: '',
    isCompleted: false
  };
  list: task[] = [];
  addTasks() {
    this.list.push(this.tasks);
    this.tasks = {task_name: '', isCompleted: false};
  }
  removeTasks(index: number) {
    this.list.splice(index, 1);
  }
  completedTask(index: number) {
    this.list[index].isCompleted = !this.list[index].isCompleted;
  }
}

import { Component, signal } from '@angular/core';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [NgSwitch, NgSwitchCase, NgSwitchDefault],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('NgSwitch Demo');
  
  // Signal for current tab selection
  currentTab = signal('home');
  
  // Signal for user role
  userRole = signal('guest');
  
  // Methods to change values
  setTab(tab: string) {
    this.currentTab.set(tab);
  }
  
  setUserRole(role: string) {
    this.userRole.set(role);
  }
}

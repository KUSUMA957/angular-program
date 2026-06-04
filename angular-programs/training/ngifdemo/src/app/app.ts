import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Ifcomp } from '../components/ifcomp/ifcomp';
import { WelcomeComponent } from '../components/welcome-component/welcome-component';
@Component({
  selector: 'app-root',
  imports: [Ifcomp, WelcomeComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ngifdemo');
}

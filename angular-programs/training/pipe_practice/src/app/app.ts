import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CapitalizePipe } from './capitalize/capitalize-pipe';
import { ReversePipe } from './reverse/reverse-pipe';
import { PasswordMaskPipe } from './password_mask/password-mask-pipe';
import { EvenOddPipe } from './even-odd_pipe/even-odd-pipe';
import { TruncatePipe } from './truncate/truncate-pipe';
import { TConvPipe } from './temperature_converter/t-conv-pipe';
@Component({
  selector: 'app-root',
  imports: [CapitalizePipe, ReversePipe, PasswordMaskPipe, EvenOddPipe, TruncatePipe, TConvPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('pipe_practice');
  name: string = "kusuma";
  other_name: string = "kusuma mogadala";
  num: number = 2;
  num1: number = 3;
  sentence: string = "Hey I am learning Angular";
  temp: number = 25;
}

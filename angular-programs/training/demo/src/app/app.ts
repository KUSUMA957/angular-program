import { Component, NgModule, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CounterComponent} from '../counter-component/counter-component';
import { FormsModule } from '@angular/forms';
import {CustompipePipe} from '../custompipe-pipe';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CounterComponent, FormsModule, CustompipePipe, BrowserModule, NgModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  names: string[] = [
    'Kusuma',
    'Teja',
    'Maya',
    'Maha'
  ];
  searchText: string = '';
}

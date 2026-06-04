import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header.component';
import { CategorySelectorComponent } from './components/category-selector.component';
import { ItemListComponent } from './components/item-list.component';
import { StatisticsComponent } from './components/statistics.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, CategorySelectorComponent, ItemListComponent, StatisticsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('reactivecomponentsdemo');
}

import { Component } from '@angular/core';
import { ParentDefaultComponent } from './parent-default.component';
import { ParentSignalsComponent } from './parent-signals.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ParentDefaultComponent, ParentSignalsComponent],
  template: `
    <h1>Angular Change Detection Demo (Default vs OnPush vs Signals)</h1>

    <section style="border:1px solid #ddd; padding:12px; margin:12px 0;">
      <app-parent-default></app-parent-default>
    </section>

    <section style="border:1px solid #ddd; padding:12px; margin:12px 0;">
      <app-parent-signals></app-parent-signals>
    </section>
  `
})
export class App {}



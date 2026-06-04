import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-dashboard-profile',
  standalone: true,
   imports: [RouterModule], 
  template: `<h3>Profile</h3><p>Profile content...</p>`
})
export class ProfileComponent {}
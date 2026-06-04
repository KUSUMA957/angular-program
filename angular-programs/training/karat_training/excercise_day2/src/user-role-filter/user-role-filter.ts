import { Component } from '@angular/core';
import { UserRoleFilterPipe } from '../pipes/user-role-filter-pipe';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-role-filter',
  imports: [UserRoleFilterPipe, CommonModule],
  templateUrl: './user-role-filter.html',
  styleUrl: './user-role-filter.css',
})
export class UserRoleFilter {
  roles = ['Admin', 'User', 'Manager'];
  users = [
    { name: 'Kusuma', role: 'Admin' },
    { name: 'Pallavi', role: 'User' },
    { name: 'Keerthana', role: 'User' },
    { name: 'Teja', role: 'Admin' },
    { name: 'Maha', role: 'Manager' }
  ];
  activeRole: string = 'All';
}

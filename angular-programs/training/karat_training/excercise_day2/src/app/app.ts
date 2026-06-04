import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductFilter } from '../product-filter/product-filter';
import { StudentFilter } from '../student-filter/student-filter';
import { UserRoleFilter } from '../user-role-filter/user-role-filter';
import { SearchUsers } from '../search-users/search-users';
import { CurrencyFormatting } from '../currency-formatting/currency-formatting';
import { DateFormatting } from '../date-formatting/date-formatting';
import { Username } from '../username/username';
import { ProductList } from '../product-list/product-list';
import { UserList } from '../user-list/user-list';
import { UserProfile } from '../user-profile/user-profile';
@Component({
  selector: 'app-root',
  imports: [ProductFilter, StudentFilter, UserRoleFilter, SearchUsers, CurrencyFormatting, DateFormatting, Username, ProductList, UserList, UserProfile],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('excercise_day2');
}

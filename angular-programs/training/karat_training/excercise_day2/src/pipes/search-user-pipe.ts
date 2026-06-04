import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchUser',
})
export class SearchUserPipe implements PipeTransform {
  transform(users: any[], searchText: string): any[] {
    if (!users || !searchText) {
      return users;
    }
    searchText = searchText.toLowerCase();
    return users.filter(user =>
      user.name.toLowerCase().includes(searchText) ||
      user.email.toLowerCase().includes(searchText)
    );
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'employeeFilter',
  standalone: true
})
export class EmployeeFilterPipe implements PipeTransform {
  transform(employees: any[], text: string): any[] {
    if(!employees) return [];
    if(!text) return employees;
    return employees.filter(emp => emp.name.toLowerCase().includes(text.toLowerCase()));
  }
}



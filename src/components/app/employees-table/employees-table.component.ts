import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.css']
})
export class EmployeesTableComponent {
  displayedColumns: string[] = ['companyName', 'percentage'];

  constructor() { }

  @Input() employees: any[];

}

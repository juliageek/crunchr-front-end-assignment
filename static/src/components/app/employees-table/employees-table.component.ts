import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.css']
})
export class EmployeesTableComponent {
  onSortChange(value): void {
    this.sortChange.emit(value);
  }

  @Input() employees: any[];
  @Output() sortChange = new EventEmitter<string>();

}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Company } from "../../../interfaces/interfaces";

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.css']
})
export class EmployeesTableComponent {
  onSortChange(value): void {
    this.sortChange.emit(value);
  }

  @Input() employees: Company[];
  @Input() locationCategory: string;
  @Output() sortChange = new EventEmitter<string>();

}

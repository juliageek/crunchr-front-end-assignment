import { Component } from '@angular/core';
import { LocationsService } from '../../services/locations.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Crunchr';
  employees: any;
  location: string;

  constructor(private locationsService: LocationsService) {}

  onSelectLocation(location) {
    this.location = location;
  }

  searchEmployees() {
    this.locationsService.getEmployeesPerLocation(this.location)
      .subscribe(response => {
        this.employees = Object.values(response);
      });
  }
}

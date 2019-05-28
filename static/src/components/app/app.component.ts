import { Component } from '@angular/core';
import { Location, Company } from '../../interfaces/interfaces';
import { LocationsService } from '../../services/locations.service';
import { Sort } from '@angular/material';
import Utils from '../../utils/utils';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  employees: Company[];
  locationCategory: string;
  selectedLocation: Location;
  percentage = 0;

  constructor(private locationsService: LocationsService) {

  }

  onInputPercentage(value) {
    this.percentage = value;
  }

  onSelectLocation(location) {
    this.selectedLocation = location;
    this.locationCategory = location.pathNames.split('/')[0];
  }

  onSortChange(event) {
    this.sortData(event);
  }

  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      return;
    }

    this.employees.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'companyName': return Utils.compare(a.companyName, b.companyName, isAsc);
        case 'percentage': return Utils.compare(a.percentage, b.percentage, isAsc);
        default: return 0;
      }
    });
  }

  searchEmployees() {
    this.locationsService.getEmployeesPerLocation(this.selectedLocation.id, this.percentage)
      .subscribe(response => {
        this.employees = Object.values(response);
      });
  }
}

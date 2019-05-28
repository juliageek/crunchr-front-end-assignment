import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Location } from '../../../interfaces/interfaces';
import { LocationsService } from '../../../services/locations.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})

export class DropdownComponent implements OnInit{
  locations: Location[];

  constructor(private locationsService: LocationsService) {}

  onChange(value): void {
    const location = this.locations.find((location) => location.id === value);
    this.selectedLocation.emit(location);
  }

 ngOnInit(): void {
    this.locationsService.getLocations()
      .subscribe(response => {
        this.locations = Object.values(response).map((location) => {
          return {
            id: location.id,
            name: location.name,
            pathNames: location.pathnames.join('/'),
            path: location.path
          };
        });
      });
  }

  @Output() selectedLocation = new EventEmitter<Location>();
}

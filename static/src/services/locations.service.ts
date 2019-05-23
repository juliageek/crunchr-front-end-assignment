import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LocationsService {
  constructor(private http: HttpClient) { }

  getLocations() {
    return this.http.get('http://localhost:5555/api/locations');
  }

  getEmployeesPerLocation(locationId, percentageLimit) {
    const options = { params: new HttpParams().set('locationId', locationId).set('percentageLimit', '' + percentageLimit) };
    return this.http.get('http://localhost:5555/api/companies/percentage_per_location', options);
  }
}

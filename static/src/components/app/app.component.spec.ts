import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { EmployeesTableComponent } from './employees-table/employees-table.component';
import { MatTableModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';

import {
  MatOption,
  MatSelect
} from '@angular/material';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        DropdownComponent,
        EmployeesTableComponent,
        MatOption,
        MatSelect
      ],
      imports: [ MatFormFieldModule, MatTableModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'crunchr'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('crunchr');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to crunchr!');
  });
});

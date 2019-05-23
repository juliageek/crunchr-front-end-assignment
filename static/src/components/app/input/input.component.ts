import { Component, EventEmitter, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnChanges {
  value = '0';

  onChange(value): void {
    this.inputPercentage.emit(value);
  }

  clearValue(): void {
    this.value = '0';
    this.inputPercentage.emit(this.value);
  }

  @Output() inputPercentage = new EventEmitter<string>();
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}

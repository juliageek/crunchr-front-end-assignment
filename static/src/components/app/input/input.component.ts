import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  value = 0;

  onChange(value): void {
    this.inputPercentage.emit(value);
  }

  clearValue(): void {
    this.value = 0;
    this.inputPercentage.emit(this.value);
  }

  @Output() inputPercentage = new EventEmitter<number>();
}

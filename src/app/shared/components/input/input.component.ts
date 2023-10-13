import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() type!: 'text' | 'email' | 'password';
  @Input() placeholder!: string;
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
}

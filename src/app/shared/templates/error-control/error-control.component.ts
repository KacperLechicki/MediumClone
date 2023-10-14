import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-control',
  standalone: true,
  imports: [],
  templateUrl: './error-control.component.html',
  styleUrls: ['./error-control.component.scss'],
})
export class ErrorControlComponent {
  @Input() message!: string;
}

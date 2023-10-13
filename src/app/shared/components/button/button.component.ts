import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() type!: 'submit' | 'button';
  @Input() label!: string;
  @Input() icon!: string;
  @Input() style!: 'primary' | 'secondary' | 'pill';

  @Output() btnClick = new EventEmitter<MouseEvent>();

  protected emitClick(): void {
    this.btnClick.emit();
  }
}

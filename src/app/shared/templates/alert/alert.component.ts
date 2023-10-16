import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ValidationErrorInterface } from 'src/app/auth/types/validationError.interface';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  @Input() type!: 'danger' | 'success' | 'warning' | 'info';
  @Input() contentType!: 'validationErrors';
  @Input() content!: ValidationErrorInterface | string;

  protected errorMessages: string[] = [];

  ngOnInit(): void {
    if (this.contentType === 'validationErrors' && this.content) {
      this.errorMessages = Object.keys(this.content).map((name: string) => {
        const messages = (this.content as ValidationErrorInterface)[name].join(
          ' '
        );
        return `${name} ${messages}`;
      });
    }
  }

  protected trackByFn(index: number, item: string): number {
    return index;
  }
}

import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnChanges {
  @Input() condition!: boolean | null;
  @Input() overlay!: boolean;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['condition'] && changes['condition'].currentValue === true) {
      this.scrollToTop();
    }
  }

  private scrollToTop(): void {
    window.scrollTo(0, 0);
  }
}

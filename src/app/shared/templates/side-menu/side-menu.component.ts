import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent {
  @Input() name!: string;
  @Input() title!: string;

  @ViewChild('closeButton') closeBtn!: ElementRef<HTMLButtonElement>;

  @HostListener('window:resize', ['$event'])
  private onResize(event: Event): void {
    this.closeBtn.nativeElement.click();
  }
}

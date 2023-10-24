import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent {
  @Input() isFavorite = false;
  @Input() favoritesCount = 0;
  @Input() articleSlug = '';

  protected handleLike(): void {
    if (this.isFavorite) {
      this.favoritesCount--;
    } else {
      this.favoritesCount++;
    }

    this.isFavorite = !this.isFavorite;
  }
}

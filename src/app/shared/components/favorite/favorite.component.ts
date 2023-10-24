import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { addToFavoritesActions } from './store/actions';

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

  constructor(private store: Store) {}

  protected handleLike(): void {
    this.store.dispatch(
      addToFavoritesActions.addToFavorites({
        isFavorite: this.isFavorite,
        slug: this.articleSlug,
      })
    );

    if (this.isFavorite) {
      this.favoritesCount--;
    } else {
      this.favoritesCount++;
    }

    this.isFavorite = !this.isFavorite;
  }
}

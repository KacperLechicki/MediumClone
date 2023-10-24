import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FavoriteService } from '../services/favorite.service';
import { addToFavoritesActions } from './actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { ArticleInterface } from 'src/app/shared/types/article.interface';

export const addToFavortiesEffect = createEffect(
  (actions$ = inject(Actions), favoriteService = inject(FavoriteService)) => {
    return actions$.pipe(
      ofType(addToFavoritesActions.addToFavorites),
      switchMap(({ isFavorite, slug }) => {
        const articles$ = isFavorite
          ? favoriteService.removeFromFavorites(slug)
          : favoriteService.addToFavorites(slug);
        return articles$.pipe(
          map((article: ArticleInterface) => {
            return addToFavoritesActions.addToFavoritesSuccess({ article });
          }),
          catchError(() => {
            return of(addToFavoritesActions.addToFavoritesFailure());
          })
        );
      })
    );
  },
  { functional: true }
);

import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { popularTagsActions } from './actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { PopularTagsService } from '../services/popular-tags.service';

export const getPopularTagsEffect = createEffect(
  (
    actions$ = inject(Actions),
    popularTagsService = inject(PopularTagsService)
  ) => {
    return actions$.pipe(
      ofType(popularTagsActions.getPopularTags),
      switchMap(() => {
        return popularTagsService.getPopularTags().pipe(
          map((popularTags: string[]) => {
            return popularTagsActions.getPopularTagsSuccess({ popularTags });
          }),
          catchError(() => {
            return of(popularTagsActions.getPopularTagsFailure());
          })
        );
      })
    );
  },
  { functional: true }
);

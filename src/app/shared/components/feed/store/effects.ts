import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FeedService } from '../services/feed.service';
import { FeedActions } from './actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { FeedResponseInterface } from '../types/feed-response.interface';

export const getFeedEffect = createEffect(
  (actions$ = inject(Actions), feedService = inject(FeedService)) => {
    return actions$.pipe(
      ofType(FeedActions.getFeed),
      switchMap(({ url }) => {
        return feedService.getFeed(url).pipe(
          map((feed: FeedResponseInterface) => {
            return FeedActions.getFeedSuccess({ feed });
          }),
          catchError(() => {
            return of(FeedActions.getFeedFailure());
          })
        );
      })
    );
  },
  { functional: true }
);

import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { FeedResponseInterface } from '../types/feed-response.interface';

export const FeedActions = createActionGroup({
  source: 'feed',
  events: {
    'Get Feed': props<{ url: string }>(),
    'Get Feed Success': props<{ feed: FeedResponseInterface }>(),
    'Get Feed Failure': emptyProps(),
  },
});

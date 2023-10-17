import { createFeature, createReducer, on } from '@ngrx/store';
import { FeedStateInterface } from '../types/feed-state.interface';
import { FeedActions } from './actions';
import { routerNavigationAction } from '@ngrx/router-store';

const initialState: FeedStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const feedFeature = createFeature({
  name: 'feed',
  reducer: createReducer(
    initialState,
    on(FeedActions.getFeed, (state: FeedStateInterface) => ({
      ...state,
      isLoading: true,
    })),
    on(FeedActions.getFeedSuccess, (state: FeedStateInterface, action) => ({
      ...state,
      isLoading: false,
      data: action.feed,
    })),
    on(FeedActions.getFeedFailure, (state: FeedStateInterface) => ({
      ...state,
      isLoading: false,
    })),
    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: feedFeatureKey,
  reducer: feedReducer,
  selectIsLoading,
  selectError,
  selectData: selectFeedData,
} = feedFeature;

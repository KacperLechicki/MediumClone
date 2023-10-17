import { createFeature, createReducer, on } from '@ngrx/store';
import { routerNavigationAction } from '@ngrx/router-store';
import { PopularTagsStateInterface } from '../types/popularTagsState.interface';
import { popularTagsActions } from './actions';

const initialState: PopularTagsStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const popularTagsFeature = createFeature({
  name: 'popular tags',
  reducer: createReducer(
    initialState,
    on(
      popularTagsActions.getPopularTags,
      (state: PopularTagsStateInterface) => ({
        ...state,
        isLoading: true,
      })
    ),
    on(
      popularTagsActions.getPopularTagsSuccess,
      (state: PopularTagsStateInterface, action) => ({
        ...state,
        isLoading: false,
        data: action.popularTags,
      })
    ),
    on(
      popularTagsActions.getPopularTagsFailure,
      (state: PopularTagsStateInterface) => ({
        ...state,
        isLoading: false,
      })
    ),
    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: popularTagsFeatureKey,
  reducer: popularTagsReducer,
  selectIsLoading,
  selectError,
  selectData: selectPopularTagsData,
} = popularTagsFeature;

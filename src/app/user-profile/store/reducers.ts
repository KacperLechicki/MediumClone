import { createFeature, createReducer, on } from '@ngrx/store';
import { UserProfileStateInterface } from '../types/userProfileState.interface';
import { userProfileActions } from './actions';
import { routerNavigationAction } from '@ngrx/router-store';

const initialState: UserProfileStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const userProfileFeature = createFeature({
  name: 'userProfile',
  reducer: createReducer(
    initialState,
    on(
      userProfileActions.getUserProfile,
      (state: UserProfileStateInterface) => ({ ...state, isLoading: true })
    ),
    on(
      userProfileActions.getUserProfileSuccess,
      (state: UserProfileStateInterface, action) => ({
        ...state,
        isLoading: false,
        data: action.userProfile,
      })
    ),
    on(
      userProfileActions.getUserProfileFailure,
      (state: UserProfileStateInterface) => ({
        ...state,
        isLoading: false,
      })
    ),
    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: userProfileFeatureKey,
  reducer: userProfileReducer,
  selectData,
  selectError,
  selectIsLoading,
} = userProfileFeature;

import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthStateInterface } from '../types/authState.interface';
import { authActions } from './actions';
import { routerNavigatedAction } from '@ngrx/router-store';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: undefined,
  isLoading: false,
  validationErrors: null,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(
      authActions.register,
      (state: AuthStateInterface): AuthStateInterface => ({
        ...state,
        isSubmitting: true,
        validationErrors: null,
      })
    ),

    on(
      authActions.registerSuccess,
      (state: AuthStateInterface, action): AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        currentUser: action.currentUser,
        validationErrors: null,
      })
    ),

    on(
      authActions.registerFailure,
      (state: AuthStateInterface, action): AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        validationErrors: action.errors,
      })
    ),

    on(
      authActions.login,
      (state: AuthStateInterface): AuthStateInterface => ({
        ...state,
        isSubmitting: true,
        validationErrors: null,
      })
    ),

    on(
      authActions.loginSuccess,
      (state: AuthStateInterface, action): AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        currentUser: action.currentUser,
        validationErrors: null,
      })
    ),

    on(
      authActions.loginFailure,
      (state: AuthStateInterface, action): AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        validationErrors: action.errors,
      })
    ),

    on(
      authActions.logout,
      (state: AuthStateInterface): AuthStateInterface => ({
        ...state,
        isLoading: true,
      })
    ),

    on(
      authActions.logoutSuccess,
      (state: AuthStateInterface, action): AuthStateInterface => ({
        ...state,
        isLoading: false,
        currentUser: null,
      })
    ),

    on(
      authActions.logoutFailure,
      (state: AuthStateInterface, action): AuthStateInterface => ({
        ...state,
        isLoading: false,
      })
    ),

    on(
      authActions.getCurrentUser,
      (state: AuthStateInterface): AuthStateInterface => ({
        ...state,
        isLoading: true,
      })
    ),

    on(
      authActions.getCurrentUserSuccess,
      (state: AuthStateInterface, action): AuthStateInterface => ({
        ...state,
        isLoading: false,
        currentUser: action.currentUser,
      })
    ),

    on(
      authActions.getCurrentUserFailure,
      (state: AuthStateInterface): AuthStateInterface => ({
        ...state,
        isLoading: false,
        currentUser: null,
      })
    ),

    on(
      authActions.updateCurrentUserSuccess,
      (state: AuthStateInterface, action): AuthStateInterface => ({
        ...state,
        currentUser: action.currentUser,
      })
    ),

    on(routerNavigatedAction, (state: AuthStateInterface) => ({
      ...state,
      validationErrors: null,
    }))
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectCurrentUser,
  selectValidationErrors,
  selectIsLoading,
} = authFeature;

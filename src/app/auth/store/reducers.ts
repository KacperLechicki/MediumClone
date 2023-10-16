import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthStateInterface } from '../types/authState.interface';
import { authActions } from './actions';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: undefined,
  isLoading: false,
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
      })
    ),

    on(
      authActions.registerSuccess,
      (state: AuthStateInterface, action): AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        currentUser: action.currentUser,
      })
    ),

    on(
      authActions.registerFailure,
      (state: AuthStateInterface): AuthStateInterface => ({
        ...state,
        isSubmitting: false,
      })
    ),

    on(
      authActions.login,
      (state: AuthStateInterface): AuthStateInterface => ({
        ...state,
        isSubmitting: true,
      })
    ),

    on(
      authActions.loginSuccess,
      (state: AuthStateInterface, action): AuthStateInterface => ({
        ...state,
        isSubmitting: false,
        currentUser: action.currentUser,
      })
    ),

    on(
      authActions.loginFailure,
      (state: AuthStateInterface): AuthStateInterface => ({
        ...state,
        isSubmitting: false,
      })
    )
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
} = authFeature;

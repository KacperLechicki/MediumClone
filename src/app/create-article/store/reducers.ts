import { createFeature, createReducer, on } from '@ngrx/store';
import { CreateArticleStateInterface } from '../types/createArticleState.interface';
import { createArticleActions } from './actions';
import { routerNavigationAction } from '@ngrx/router-store';

const initialState: CreateArticleStateInterface = {
  isSubmitting: false,
  validationErrors: null,
};

const createArticleFeature = createFeature({
  name: 'create article',
  reducer: createReducer(
    initialState,
    on(
      createArticleActions.createArticle,
      (state: CreateArticleStateInterface): CreateArticleStateInterface => ({
        ...state,
        isSubmitting: true,
      })
    ),
    on(
      createArticleActions.createArticleSuccess,
      (state: CreateArticleStateInterface): CreateArticleStateInterface => ({
        ...state,
        isSubmitting: false,
      })
    ),
    on(
      createArticleActions.createArticleFailure,
      (
        state: CreateArticleStateInterface,
        action
      ): CreateArticleStateInterface => ({
        ...state,
        isSubmitting: false,
        validationErrors: action.errors,
      })
    ),
    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: createArticleFeatureKey,
  reducer: createArticleReducer,
  selectIsSubmitting,
  selectValidationErrors,
} = createArticleFeature;

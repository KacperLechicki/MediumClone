import { createFeature, createReducer, on } from '@ngrx/store';
import { EditArticleStateInterface } from '../types/editArticleState.interface';
import { editArticleActions } from './actions';
import { routerNavigationAction } from '@ngrx/router-store';

const initialState: EditArticleStateInterface = {
  article: null,
  isLoading: false,
  isSubmitting: false,
  validationErrors: null,
};

const editArticleFeature = createFeature({
  name: 'edit article',
  reducer: createReducer(
    initialState,
    on(
      editArticleActions.getArticle,
      (state: EditArticleStateInterface): EditArticleStateInterface => ({
        ...state,
        isLoading: true,
      })
    ),
    on(
      editArticleActions.getArticleSuccess,
      (
        state: EditArticleStateInterface,
        action
      ): EditArticleStateInterface => ({
        ...state,
        isLoading: false,
        article: action.article,
      })
    ),
    on(
      editArticleActions.getArticleFailure,
      (state: EditArticleStateInterface): EditArticleStateInterface => ({
        ...state,
        isLoading: false,
      })
    ),

    on(
      editArticleActions.updateArticle,
      (state: EditArticleStateInterface): EditArticleStateInterface => ({
        ...state,
        isSubmitting: true,
      })
    ),
    on(
      editArticleActions.updateArticleSuccess,
      (state: EditArticleStateInterface): EditArticleStateInterface => ({
        ...state,
        isSubmitting: false,
      })
    ),
    on(
      editArticleActions.updateArticleFailure,
      (
        state: EditArticleStateInterface,
        action
      ): EditArticleStateInterface => ({
        ...state,
        isSubmitting: false,
        validationErrors: action.errors,
      })
    ),
    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: editArticleFeatureKey,
  reducer: editArticleReducer,
  selectArticle,
  selectIsLoading,
  selectIsSubmitting,
  selectValidationErrors,
} = editArticleFeature;

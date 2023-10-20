import { createFeature, createReducer, on } from '@ngrx/store';
import { ArticleStateInterface } from '../types/articleState.interface';
import { articleActions } from './actions';
import { routerNavigatedAction } from '@ngrx/router-store';

const initialState: ArticleStateInterface = {
  isLoading: false,
  error: null,
  data: null,
  deleteIsLoading: false,
};

const articleFeature = createFeature({
  name: 'article',
  reducer: createReducer(
    initialState,
    on(
      articleActions.getArticle,
      (state: ArticleStateInterface): ArticleStateInterface => ({
        ...state,
        isLoading: true,
      })
    ),
    on(
      articleActions.getArticleSuccess,
      (state: ArticleStateInterface, actions): ArticleStateInterface => ({
        ...state,
        isLoading: false,
        data: actions.article,
      })
    ),
    on(
      articleActions.getArticleFailure,
      (state: ArticleStateInterface, actions): ArticleStateInterface => ({
        ...state,
        isLoading: false,
      })
    ),
    on(
      articleActions.deleteArticle,
      (state: ArticleStateInterface): ArticleStateInterface => ({
        ...state,
        deleteIsLoading: true,
      })
    ),
    on(
      articleActions.deleteArticleSuccess,
      (state: ArticleStateInterface): ArticleStateInterface => ({
        ...state,
        deleteIsLoading: false,
      })
    ),
    on(
      articleActions.deleteArticleFailure,
      (state: ArticleStateInterface): ArticleStateInterface => ({
        ...state,
        deleteIsLoading: false,
      })
    ),
    on(routerNavigatedAction, () => initialState)
  ),
});

export const {
  name: articleFeatureKey,
  reducer: articleReducer,
  selectIsLoading,
  selectData: selectArticleData,
  selectError,
  selectDeleteIsLoading,
} = articleFeature;

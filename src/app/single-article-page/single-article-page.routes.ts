import { Route } from '@angular/router';
import { SingleArticlePageComponent } from './components/single-article-page.component';
import { provideEffects } from '@ngrx/effects';
import * as articleEffects from './store/effects';
import { provideState } from '@ngrx/store';
import { articleFeatureKey, articleReducer } from './store/reducers';
import { SingleArticleService } from './services/single-article.service';

export const singleArticlePageRoutes: Route[] = [
  {
    path: '',
    component: SingleArticlePageComponent,
    providers: [
      provideEffects(articleEffects),
      provideState(articleFeatureKey, articleReducer),
      SingleArticleService
    ],
  },
];

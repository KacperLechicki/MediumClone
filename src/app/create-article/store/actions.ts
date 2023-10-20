import { createActionGroup, props } from '@ngrx/store';
import { ValidationErrorInterface } from 'src/app/auth/types/validationError.interface';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { ArticleRequestInterface } from 'src/app/shared/types/articleRequest.interface';

export const createArticleActions = createActionGroup({
  source: 'create article',
  events: {
    'Create Article': props<{ request: ArticleRequestInterface }>(),
    'Create Article Success': props<{ article: ArticleInterface }>(),
    'Create Article Failure': props<{ errors: ValidationErrorInterface }>(),
  },
});

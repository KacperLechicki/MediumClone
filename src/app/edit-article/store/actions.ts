import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ValidationErrorInterface } from 'src/app/auth/types/validationError.interface';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { ArticleRequestInterface } from 'src/app/shared/types/articleRequest.interface';

export const editArticleActions = createActionGroup({
  source: 'edit article',
  events: {
    'Get Article': props<{
      slug: string;
    }>(),
    'Get Article Success': props<{ article: ArticleInterface }>(),
    'Get Article Failure': emptyProps(),

    'Update Article': props<{
      request: ArticleRequestInterface;
      slug: string;
    }>(),
    'Update Article Success': props<{ article: ArticleInterface }>(),
    'Update Article Failure': props<{ errors: ValidationErrorInterface }>(),
  },
});

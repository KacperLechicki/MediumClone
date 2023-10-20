import { ValidationErrorInterface } from 'src/app/auth/types/validationError.interface';
import { ArticleInterface } from 'src/app/shared/types/article.interface';

export interface EditArticleStateInterface {
  article: ArticleInterface | null;
  isLoading: boolean;
  isSubmitting: boolean;
  validationErrors: ValidationErrorInterface | null;
}

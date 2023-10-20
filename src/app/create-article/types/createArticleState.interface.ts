import { ValidationErrorInterface } from 'src/app/auth/types/validationError.interface';

export interface CreateArticleStateInterface {
  isSubmitting: boolean;
  validationErrors: ValidationErrorInterface | null;
}

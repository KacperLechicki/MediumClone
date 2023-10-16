import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { ValidationErrorInterface } from './validationError.interface';

export interface AuthStateInterface {
  isSubmitting: boolean;
  currentUser: CurrentUserInterface | null | undefined;
  isLoading: boolean;
  validationErrors: ValidationErrorInterface | null;
}

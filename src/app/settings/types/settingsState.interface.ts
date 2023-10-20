import { ValidationErrorInterface } from 'src/app/auth/types/validationError.interface';

export interface SettingsStateInterface {
  isSubmitting: boolean;
  validationErrors: ValidationErrorInterface | null;
}

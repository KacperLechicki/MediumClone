import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { LoginRequestInterface } from '../types/loginRequest.interface';
import { ValidationErrorInterface } from '../types/validationError.interface';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{ request: RegisterRequestInterface }>(),
    'Register Success': props<{ currentUser: CurrentUserInterface }>(),
    'Register Failure': props<{errors: ValidationErrorInterface}>(),

    Login: props<{ request: LoginRequestInterface }>(),
    'Login Success': props<{ currentUser: CurrentUserInterface }>(),
    'Login Failure': emptyProps(),

    'Get Current User': emptyProps(),
    'Get Current User Success': props<{ currentUser: CurrentUserInterface }>(),
    'Get Current User Failure': emptyProps(),
  },
});

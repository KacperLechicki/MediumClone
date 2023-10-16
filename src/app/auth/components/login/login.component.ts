import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { selectIsSubmitting } from '../../store/reducers';
import { Store } from '@ngrx/store';
import { AuthStateInterface } from '../../types/authState.interface';
import { LoginRequestInterface } from '../../types/loginRequest.interface';
import { authActions } from '../../store/actions';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from 'src/app/shared/templates/spinner/spinner.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    CommonModule,
    SpinnerComponent,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  protected form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  protected isSubmitting$ = this.store.select(selectIsSubmitting);

  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: AuthStateInterface }>
  ) {}

  protected submit(): void {
    this.form.markAllAsTouched();
    const request: LoginRequestInterface = {
      user: this.form.getRawValue(),
    };

    this.store.dispatch(authActions.login({ request }));
  }

  protected reset(): void {
    this.form.reset();
  }
}

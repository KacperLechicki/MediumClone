import { Component } from '@angular/core';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { RouterLink } from '@angular/router';
import { AuthStateInterface } from '../../types/authState.interface';
import { CommonModule } from '@angular/common';
import { selectIsSubmitting } from '../../store/reducers';
import { authActions } from '../../store/actions';
import { SpinnerComponent } from 'src/app/shared/templates/spinner/spinner.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    SpinnerComponent,
  ],
})
export class RegisterComponent {
  protected form = this.fb.nonNullable.group({
    username: ['', Validators.required],
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
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    };

    this.store.dispatch(authActions.register({ request }));
  }

  protected reset(): void {
    this.form.reset();
  }
}

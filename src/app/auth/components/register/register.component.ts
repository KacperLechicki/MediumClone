import { Component, OnInit } from '@angular/core';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { RouterLink } from '@angular/router';
import { AuthStateInterface } from '../../types/authState.interface';
import { CommonModule } from '@angular/common';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers';
import { authActions } from '../../store/actions';
import { SpinnerComponent } from 'src/app/shared/templates/spinner/spinner.component';
import { combineLatest } from 'rxjs';
import { AlertComponent } from 'src/app/shared/templates/alert/alert.component';

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
    AlertComponent,
  ],
})
export class RegisterComponent implements OnInit {
  protected form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  protected data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    validationErrors: this.store.select(selectValidationErrors),
  });

  protected resetFlag!: boolean;

  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: AuthStateInterface }>
  ) {}

  ngOnInit(): void {
    this.resetFlag = false;
  }

  protected submit(): void {
    this.resetFlag = false;
    if (this.form.valid) {
      this.form.markAllAsTouched();
      const request: RegisterRequestInterface = {
        user: this.form.getRawValue(),
      };

      this.store.dispatch(authActions.register({ request }));
    }
  }

  protected reset(): void {
    this.resetFlag = true;
    this.form.reset();
  }
}

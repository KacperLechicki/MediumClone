import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers';
import { Store } from '@ngrx/store';
import { AuthStateInterface } from '../../types/authState.interface';
import { LoginRequestInterface } from '../../types/loginRequest.interface';
import { authActions } from '../../store/actions';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from 'src/app/shared/templates/spinner/spinner.component';
import { RouterModule } from '@angular/router';
import { combineLatest } from 'rxjs';
import { AlertComponent } from 'src/app/shared/templates/alert/alert.component';

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
    AlertComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  protected form = this.fb.nonNullable.group({
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
      const request: LoginRequestInterface = {
        user: this.form.getRawValue(),
      };

      this.store.dispatch(authActions.login({ request }));
    }
  }

  protected reset(): void {
    this.resetFlag = true;
    this.form.reset();
  }

  protected handleEnterKey(): void {
    if (this.form.valid) {
      this.submit();
    } else {
      this.reset();
    }
  }
}

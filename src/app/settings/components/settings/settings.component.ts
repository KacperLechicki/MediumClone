import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Subscription, combineLatest, filter } from 'rxjs';
import { selectCurrentUser } from 'src/app/auth/store/reducers';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers';
import { CommonModule } from '@angular/common';
import { AlertComponent } from 'src/app/shared/templates/alert/alert.component';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { TextareaComponent } from 'src/app/shared/components/textarea/textarea.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { CurrentUserRequestInterface } from 'src/app/shared/types/currentUserRequest.interface';
import { authActions } from 'src/app/auth/store/actions';
import { SpinnerComponent } from 'src/app/shared/templates/spinner/spinner.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    AlertComponent,
    ReactiveFormsModule,
    InputComponent,
    TextareaComponent,
    RouterModule,
    IonicModule,
    ButtonComponent,
    SpinnerComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  protected form = this.fb.nonNullable.group({
    image: new FormControl<string>('', [Validators.required]),
    username: new FormControl<string>('', [Validators.required]),
    bio: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
  });
  protected currentUser?: CurrentUserInterface;
  protected data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    validationErrors: this.store.select(selectValidationErrors),
  });
  protected resetFlag!: boolean;

  private _subscriptions = new Subscription();

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.resetFlag = false;
    this._subscriptions.add(
      this.store
        .pipe(select(selectCurrentUser), filter(Boolean))
        .subscribe((currentUser: CurrentUserInterface): void => {
          this.currentUser = currentUser;
          this.initializeForm();
        })
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  protected handleEnterKey(): void {
    if (this.form.valid) {
      this.onSubmit();
    } else {
      this.reset();
    }
  }

  protected onSubmit(): void {
    if (!this.currentUser) {
      throw new Error('Current user is not set');
    }

    if (this.currentUser && this.form.getRawValue()) {
      const currentUserRequest = {
        user: {
          ...this.currentUser,
          ...this.form.getRawValue(),
        },
      };

      this.store.dispatch(
        authActions.updateCurrentUser({ currentUserRequest })
      );
    }
  }

  protected reset(): void {
    this.resetFlag = true;
    this.form.reset();
  }

  private initializeForm(): void {
    if (!this.currentUser) {
      throw new Error('Current user is not set');
    }
    this.form.patchValue({
      image: this.currentUser.image ?? '',
      username: this.currentUser.username ?? '',
      bio: this.currentUser.bio ?? '',
      email: this.currentUser.email ?? '',
      password: '',
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import {
  selectCurrentUser,
  selectIsLoading,
} from 'src/app/auth/store/reducers';
import { SideMenuComponent } from '../../templates/side-menu/side-menu.component';
import { SpinnerComponent } from '../../templates/spinner/spinner.component';
import { authActions } from 'src/app/auth/store/actions';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    SideMenuComponent,
    SpinnerComponent,
  ],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  protected data$ = combineLatest({
    currentUser: this.store.select(selectCurrentUser),
    isLoading: this.store.select(selectIsLoading),
  });

  constructor(private store: Store) {}

  protected onLogout(): void {
    this.store.dispatch(authActions.logout());
  }
}

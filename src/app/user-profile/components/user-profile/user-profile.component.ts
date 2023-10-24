import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { userProfileActions } from '../../store/actions';
import { Subscription, combineLatest, filter, map } from 'rxjs';
import { selectData, selectError, selectIsLoading } from '../../store/reducers';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { selectCurrentUser } from 'src/app/auth/store/reducers';
import { UserProfileInterface } from '../../types/userProfile.interface';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from 'src/app/shared/templates/spinner/spinner.component';
import { FeedComponent } from 'src/app/shared/components/feed/feed.component';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    SpinnerComponent,
    RouterModule,
    FeedComponent,
    IonicModule,
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  protected isCurrentUserProfile$ = combineLatest({
    currentUser: this.store.pipe(
      select(selectCurrentUser),
      filter(
        (currentUser): currentUser is CurrentUserInterface | null =>
          currentUser !== undefined
      )
    ),
    userProfile: this.store.pipe(
      select(selectData),
      filter((userProfile): userProfile is UserProfileInterface =>
        Boolean(userProfile)
      )
    ),
  }).pipe(
    map(({ currentUser, userProfile }) => {
      return currentUser?.username === userProfile.username;
    })
  );
  protected data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    userProfile: this.store.select(selectData),
    isCurrentUserProfile: this.isCurrentUserProfile$,
  });

  private slug = '';
  private _subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._subscriptions.add(
      this.route.params.subscribe((params: Params) => {
        this.slug = params['slug'];
        this.fetchUserProfile();
      })
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  protected getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites');
    return isFavorites
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`;
  }

  private fetchUserProfile(): void {
    this.store.dispatch(userProfileActions.getUserProfile({ slug: this.slug }));
  }
}

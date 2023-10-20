import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { popularTagsActions } from './store/actions';
import { Subscription, combineLatest } from 'rxjs';
import {
  selectError,
  selectIsLoading,
  selectPopularTagsData,
} from './store/reducers';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../templates/spinner/spinner.component';
import { AlertComponent } from '../../templates/alert/alert.component';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';

@Component({
  selector: 'app-popular-tags',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, AlertComponent, RouterModule],
  templateUrl: './popular-tags.component.html',
  styleUrls: ['./popular-tags.component.scss'],
})
export class PopularTagsComponent implements OnInit, OnDestroy {
  protected data$ = combineLatest({
    popularTags: this.store.select(selectPopularTagsData),
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
  });

  private _subscriptions = new Subscription();

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this._subscriptions.add(
      this.route.params.subscribe((): void => {
        this.fetchPopularTags();
      })
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  private fetchPopularTags(): void {
    this.store.dispatch(popularTagsActions.getPopularTags());
  }
}

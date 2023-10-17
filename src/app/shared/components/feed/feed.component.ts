import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FeedActions } from './store/actions';
import { combineLatest } from 'rxjs';
import { selectError, selectFeedData, selectIsLoading } from './store/reducers';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../templates/spinner/spinner.component';
import { AlertComponent } from '../../templates/alert/alert.component';
import { RouterModule } from '@angular/router';
import { ArticleComponent } from '../article/article.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    CommonModule,
    SpinnerComponent,
    AlertComponent,
    RouterModule,
    ArticleComponent,
  ],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  @Input() apiUrl: string = '';

  protected data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    feed: this.store.select(selectFeedData),
  });

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(FeedActions.getFeed({ url: this.apiUrl }));
  }
}

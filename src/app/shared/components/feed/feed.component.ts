import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { FeedActions } from './store/actions';
import { Subscription, combineLatest } from 'rxjs';
import { selectError, selectFeedData, selectIsLoading } from './store/reducers';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../templates/spinner/spinner.component';
import { AlertComponent } from '../../templates/alert/alert.component';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { ArticleComponent } from '../article/article.component';
import { PaginatorComponent } from '../paginator/paginator.component';
import { constantVariables } from '../../constants/constantVariables';
import queryString from 'query-string';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    CommonModule,
    SpinnerComponent,
    AlertComponent,
    RouterModule,
    ArticleComponent,
    PaginatorComponent,
  ],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, OnChanges, OnDestroy {
  @Input() apiUrl: string = '';

  protected limit = constantVariables.limit;
  protected baseUrl = this.router.url.split('?')[0];
  protected currentPage = 0;

  private _subscriptions = new Subscription();

  protected data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    feed: this.store.select(selectFeedData),
  });

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._subscriptions.add(
      this.route.queryParams.subscribe((params: Params) => {
        this.currentPage = Number(params['page'] || '1');
        this.fetchFeed();
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isApiUrlChanged =
      !changes['apiUrl'].firstChange &&
      changes['apiUrl'].currentValue !== changes['apiUrl'].previousValue;

    if (isApiUrlChanged) {
      this.fetchFeed();
    }
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  private fetchFeed(): void {
    const offset = this.currentPage * this.limit - this.limit;
    const parsedUrl = queryString.parseUrl(this.apiUrl);
    const stringifiedParams = queryString.stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query,
    });
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
    this.store.dispatch(FeedActions.getFeed({ url: apiUrlWithParams }));
  }
}

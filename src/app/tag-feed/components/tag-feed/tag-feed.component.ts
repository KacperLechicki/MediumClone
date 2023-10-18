import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { BannerComponent } from 'src/app/shared/components/banner/banner.component';
import { FeedTogglerComponent } from 'src/app/shared/components/feed-toggler/feed-toggler.component';
import { FeedComponent } from 'src/app/shared/components/feed/feed.component';
import { PopularTagsComponent } from 'src/app/shared/components/popular-tags/popular-tags.component';

@Component({
  selector: 'app-tag-feed',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BannerComponent,
    FeedTogglerComponent,
    FeedComponent,
    PopularTagsComponent,
  ],
  templateUrl: './tag-feed.component.html',
  styleUrls: ['./tag-feed.component.scss'],
})
export class TagFeedComponent implements OnInit, OnDestroy {
  protected apiUrl = '';
  protected tagName = '';

  private _subscriptions = new Subscription();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this._subscriptions.add(
      this.route.params.subscribe((params: Params) => {
        this.tagName = params['slug'];
        this.apiUrl = `/articles?tag=${this.tagName}`;
      })
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}

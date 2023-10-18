import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BannerComponent } from 'src/app/shared/components/banner/banner.component';
import { FeedTogglerComponent } from 'src/app/shared/components/feed-toggler/feed-toggler.component';
import { FeedComponent } from 'src/app/shared/components/feed/feed.component';
import { PopularTagsComponent } from 'src/app/shared/components/popular-tags/popular-tags.component';

@Component({
  selector: 'app-your-feed',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BannerComponent,
    FeedTogglerComponent,
    FeedComponent,
    PopularTagsComponent,
  ],
  templateUrl: './your-feed.component.html',
  styleUrls: ['./your-feed.component.scss'],
})
export class YourFeedComponent {
  protected readonly apiUrl = '/articles';
}

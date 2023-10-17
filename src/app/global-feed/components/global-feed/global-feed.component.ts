import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BannerComponent } from 'src/app/shared/components/banner/banner.component';
import { FeedComponent } from 'src/app/shared/components/feed/feed.component';
import { PopularTagsComponent } from 'src/app/shared/components/popular-tags/popular-tags.component';

@Component({
  selector: 'app-global-feed',
  standalone: true,
  imports: [CommonModule, FeedComponent, BannerComponent, PopularTagsComponent],
  templateUrl: './global-feed.component.html',
  styleUrls: ['./global-feed.component.scss'],
})
export class GlobalFeedComponent {
  protected readonly apiUrl = '/articles';
}

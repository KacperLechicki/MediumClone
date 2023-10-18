import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from 'src/app/auth/store/reducers';

@Component({
  selector: 'app-feed-toggler',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './feed-toggler.component.html',
  styleUrls: ['./feed-toggler.component.scss'],
})
export class FeedTogglerComponent {
  @Input() tagName?: string;

  protected currentUser$ = this.store.select(selectCurrentUser);

  constructor(private store: Store) {}
}

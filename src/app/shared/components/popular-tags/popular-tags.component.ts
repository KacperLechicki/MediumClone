import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { popularTagsActions } from './store/actions';
import { combineLatest } from 'rxjs';
import {
  selectError,
  selectIsLoading,
  selectPopularTagsData,
} from './store/reducers';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../templates/spinner/spinner.component';
import { AlertComponent } from '../../templates/alert/alert.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-popular-tags',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, AlertComponent, RouterModule],
  templateUrl: './popular-tags.component.html',
  styleUrls: ['./popular-tags.component.scss'],
})
export class PopularTagsComponent implements OnInit {
  protected data$ = combineLatest({
    popularTags: this.store.select(selectPopularTagsData),
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
  });

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(popularTagsActions.getPopularTags());
  }
}

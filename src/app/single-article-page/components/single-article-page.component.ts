import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { articleActions } from '../store/actions';
import { combineLatest, filter, map } from 'rxjs';
import {
  selectArticleData,
  selectError,
  selectIsLoading,
} from '../store/reducers';
import { CommonModule } from '@angular/common';
import { selectCurrentUser } from 'src/app/auth/store/reducers';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { SpinnerComponent } from 'src/app/shared/templates/spinner/spinner.component';
import { AlertComponent } from 'src/app/shared/templates/alert/alert.component';
import { TagListComponent } from 'src/app/shared/components/tag-list/tag-list.component';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-single-article-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SpinnerComponent,
    AlertComponent,
    TagListComponent,
    IonicModule,
  ],
  templateUrl: './single-article-page.component.html',
  styleUrls: ['./single-article-page.component.scss'],
})
export class SingleArticlePageComponent implements OnInit {
  protected slug = this.route.snapshot.paramMap.get('slug') ?? '';

  protected isAuthor$ = combineLatest({
    article: this.store.select(selectArticleData),
    currentUser: this.store
      .select(selectCurrentUser)
      .pipe(
        filter(
          (currentUser): currentUser is CurrentUserInterface | null =>
            currentUser !== undefined
        )
      ),
  }).pipe(
    map(({ article, currentUser }) => {
      if (!article || !currentUser) {
        return false;
      }
      return article.author.username === currentUser.username;
    })
  );

  protected data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    article: this.store.select(selectArticleData),
    isAuthor: this.isAuthor$,
  });

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(articleActions.getArticle({ slug: this.slug }));
  }

  protected deleteArticle(): void {
    this.store.dispatch(articleActions.deleteArticle({ slug: this.slug }));
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest, filter, map } from 'rxjs';
import { ArticleFormComponent } from 'src/app/shared/components/article-form/article-form.component';
import { ArticleFormValuesInterface } from 'src/app/shared/components/article-form/types/articleFormValues.interface';
import { SpinnerComponent } from 'src/app/shared/templates/spinner/spinner.component';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import {
  selectArticle,
  selectIsLoading,
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers';
import { editArticleActions } from '../../store/actions';
import { ArticleRequestInterface } from 'src/app/shared/types/articleRequest.interface';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-edit-article',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SpinnerComponent,
    ArticleFormComponent,
    IonicModule,
  ],
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss'],
})
export class EditArticleComponent implements OnInit {
  protected initialValues$: Observable<ArticleFormValuesInterface> =
    this.store.pipe(
      select(selectArticle),
      filter((article): article is ArticleInterface => article !== null),
      filter((article): article is ArticleInterface => !!article.title),
      map((article: ArticleInterface) => {
        return {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList,
        };
      })
    );

  protected slug = this.route.snapshot.paramMap.get('slug') ?? '';
  protected data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    validationErrors: this.store.select(selectValidationErrors),
    isLoading: this.store.select(selectIsLoading),
    initialValues: this.initialValues$,
  });

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.store.dispatch(editArticleActions.getArticle({ slug: this.slug }));
  }

  protected onSubmit(articleFormValues: ArticleFormValuesInterface): void {
    const request: ArticleRequestInterface = {
      article: articleFormValues,
    };
    this.store.dispatch(
      editArticleActions.updateArticle({ request, slug: this.slug })
    );
  }
}

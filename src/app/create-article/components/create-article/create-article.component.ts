import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { ArticleFormComponent } from 'src/app/shared/components/article-form/article-form.component';
import { ArticleFormValuesInterface } from 'src/app/shared/components/article-form/types/articleFormValues.interface';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers';
import { combineLatest } from 'rxjs';
import { ArticleRequestInterface } from 'src/app/shared/types/articleRequest.interface';
import { createArticleActions } from '../../store/actions';
import { SpinnerComponent } from 'src/app/shared/templates/spinner/spinner.component';

@Component({
  selector: 'app-create-article',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ArticleFormComponent,
    SpinnerComponent,
  ],
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
})
export class CreateArticleComponent {
  protected initialValues: ArticleFormValuesInterface = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };

  protected data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    validationErrors: this.store.select(selectValidationErrors),
  });

  constructor(private store: Store) {}

  protected onSubmit(articleFormValues: ArticleFormValuesInterface): void {
    const request: ArticleRequestInterface = {
      article: articleFormValues,
    };
    this.store.dispatch(createArticleActions.createArticle({ request }));
  }
}

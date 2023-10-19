import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { ArticleFormComponent } from 'src/app/shared/components/article-form/article-form.component';
import { ArticleFormValuesInterface } from 'src/app/shared/components/article-form/types/articleFormValues.interface';

@Component({
  selector: 'app-create-article',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, ArticleFormComponent],
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

  constructor(private store: Store) {}

  protected onSubmit(articleFormValues: ArticleFormValuesInterface): void {
    console.log(articleFormValues);
  }
}

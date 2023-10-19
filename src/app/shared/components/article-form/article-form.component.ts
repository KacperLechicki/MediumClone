import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ArticleFormValuesInterface } from './types/articleFormValues.interface';
import { ValidationErrorInterface } from 'src/app/auth/types/validationError.interface';

@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [],
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
})
export class ArticleFormComponent {
  @Input() initialValues?: ArticleFormValuesInterface;
  @Input() isSubmitting = false;
  @Input() errors: ValidationErrorInterface | null = null;

  @Output() articleSubmit = new EventEmitter<ArticleFormValuesInterface>();
}

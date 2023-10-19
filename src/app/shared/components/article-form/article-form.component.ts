import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticleFormValuesInterface } from './types/articleFormValues.interface';
import { ValidationErrorInterface } from 'src/app/auth/types/validationError.interface';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../templates/alert/alert.component';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import { TextareaComponent } from '../textarea/textarea.component';

@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AlertComponent,
    InputComponent,
    ButtonComponent,
    TextareaComponent
  ],
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
})
export class ArticleFormComponent implements OnInit {
  @Input() initialValues?: ArticleFormValuesInterface;
  @Input() isSubmitting = false;
  @Input() errors: ValidationErrorInterface | null = null;

  @Output() articleSubmit = new EventEmitter<ArticleFormValuesInterface>();

  protected resetFlag!: boolean;
  protected form = this.fb.nonNullable.group({
    title: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
    body: new FormControl<string>(''),
    tagList: new FormControl<string>('', [Validators.required]),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.resetFlag = false;
    this.initializeForm();
  }

  private initializeForm(): void {
    if (!this.initialValues) {
      throw new Error('Inputs are not provided');
    }

    this.form.patchValue({
      title: this.initialValues?.title || '',
      description: this.initialValues?.description || '',
      body: this.initialValues?.body || '',
      tagList: this.initialValues?.tagList
        ? this.initialValues.tagList.join(' ')
        : '',
    });
  }

  protected onSubmit(): void {
    this.resetFlag = false;
    if (this.form.valid) {
      this.form.markAllAsTouched();
      const formValue = this.form.getRawValue();
      const articleFormValues: ArticleFormValuesInterface = {
        title: formValue?.title || '',
        description: formValue?.description || '',
        body: formValue?.body || '',
        tagList: formValue?.tagList ? formValue.tagList.split(' ') : [],
      };

      this.articleSubmit.emit(articleFormValues);
    }
  }

  protected reset(): void {
    this.resetFlag = true;
    this.form.reset();
  }
}

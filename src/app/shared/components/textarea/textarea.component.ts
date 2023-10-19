import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorControlComponent } from '../../templates/error-control/error-control.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ErrorControlComponent,
    CommonModule,
    IonicModule,
  ],
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
})
export class TextareaComponent implements OnInit {
  @Input() placeholder!: string;
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Input() clearable!: boolean;
  @Input() icon!: string;

  protected errorMessage = 'Field is invalid';
  protected control!: AbstractControl;

  ngOnInit(): void {
    this.control = this.formGroup.controls[this.controlName];
  }

  protected clear(): void {
    this.control.reset();
  }
}

import { Component, Input } from '@angular/core';
import { ArticleInterface } from '../../types/article.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {
  @Input() data!: ArticleInterface;
}

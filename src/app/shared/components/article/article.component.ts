import { Component, Input } from '@angular/core';
import { ArticleInterface } from '../../types/article.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TagListComponent } from '../tag-list/tag-list.component';
import { FavoriteComponent } from '../favorite/favorite.component';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    TagListComponent,
    FavoriteComponent,
  ],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {
  @Input() data!: ArticleInterface;
}

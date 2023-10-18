import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { articleActions } from '../store/actions';

@Component({
  selector: 'app-single-article-page',
  standalone: true,
  imports: [],
  templateUrl: './single-article-page.component.html',
  styleUrls: ['./single-article-page.component.scss'],
})
export class SingleArticlePageComponent implements OnInit {
  protected slug = this.route.snapshot.paramMap.get('slug') ?? '';

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(articleActions.getArticle({ slug: this.slug }));
  }
}

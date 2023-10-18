import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { constantVariables } from '../constants/constantVariables';
import { ArticleResponseInterface } from '../types/articleResponse.interface';
import { ArticleInterface } from '../types/article.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  public getArticle(slug: string): Observable<ArticleInterface> {
    const fullUrl = `${constantVariables.backendApiUrl}/articles/${slug}`;
    return this.http
      .get<ArticleResponseInterface>(fullUrl)
      .pipe(map((response) => response.article));
  }
}

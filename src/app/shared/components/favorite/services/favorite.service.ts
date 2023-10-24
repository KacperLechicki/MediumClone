import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { constantVariables } from 'src/app/shared/constants/constantVariables';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { ArticleResponseInterface } from 'src/app/shared/types/articleResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  constructor(private http: HttpClient) {}

  public addToFavorites(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug);
    return this.http
      .post<ArticleResponseInterface>(url, {})
      .pipe(map(this.getArticle));
  }

  public removeFromFavorites(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug);
    return this.http
      .delete<ArticleResponseInterface>(url)
      .pipe(map(this.getArticle));
  }

  private getUrl(slug: string): string {
    return `${constantVariables.backendApiUrl}/articles/${slug}/favorite`;
  }

  private getArticle(response: ArticleResponseInterface): ArticleInterface {
    return response.article;
  }
}

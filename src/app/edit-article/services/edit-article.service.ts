import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { constantVariables } from 'src/app/shared/constants/constantVariables';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { ArticleRequestInterface } from 'src/app/shared/types/articleRequest.interface';
import { ArticleResponseInterface } from 'src/app/shared/types/articleResponse.interface';

@Injectable()
export class EditArticleService {
  constructor(private http: HttpClient) {}

  public updateArticle(
    slug: string,
    articleRequest: ArticleRequestInterface
  ): Observable<ArticleInterface> {
    const fullUrl = `${constantVariables.backendApiUrl}/articles/${slug}`;

    return this.http
      .put<ArticleResponseInterface>(fullUrl, articleRequest)
      .pipe(
        map(
          (response: ArticleResponseInterface): ArticleInterface =>
            response.article
        )
      );
  }
}

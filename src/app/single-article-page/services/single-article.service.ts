import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constantVariables } from 'src/app/shared/constants/constantVariables';

@Injectable()
export class SingleArticleService {
  constructor(private http: HttpClient) {}

  public deleteArticle(slug: string): Observable<{}> {
    const fullUrl = `${constantVariables.backendApiUrl}/articles/${slug}`;
    return this.http.delete(fullUrl);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedResponseInterface } from '../types/feed-response.interface';
import { constantVariables } from 'src/app/shared/constants/constantVariables';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  constructor(private http: HttpClient) {}

  public getFeed(url: string): Observable<FeedResponseInterface> {
    const fullUrl = `${constantVariables.backendApiUrl}${url}`;
    return this.http.get<FeedResponseInterface>(`${fullUrl}`);
  }
}

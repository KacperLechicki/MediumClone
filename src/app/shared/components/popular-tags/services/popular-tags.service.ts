import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PopularTagsResponseInterface } from '../types/popularTagsResponse.interface';
import { constantVariables } from 'src/app/shared/constants/constantVariables';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PopularTagsService {
  constructor(private http: HttpClient) {}

  public getPopularTags(): Observable<string[]> {
    const url = constantVariables.backendApiUrl + '/tags';
    return this.http
      .get<PopularTagsResponseInterface>(url)
      .pipe(map((response: PopularTagsResponseInterface) => response.tags));
  }
}

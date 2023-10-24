import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserProfileInterface } from '../types/userProfile.interface';
import { constantVariables } from 'src/app/shared/constants/constantVariables';
import { GetUserProfileInterface } from '../types/getUserProfileResponse.interface';

@Injectable()
export class UserProfileService {
  constructor(private http: HttpClient) {}

  public getUserProfile(slug: string): Observable<UserProfileInterface> {
    const url = `${constantVariables.backendApiUrl}/profiles/${slug}`;

    return this.http
      .get<GetUserProfileInterface>(url)
      .pipe(
        map(
          (response: GetUserProfileInterface): UserProfileInterface =>
            response.profile
        )
      );
  }
}

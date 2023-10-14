import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { Observable, map } from 'rxjs';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { constantVariables } from 'src/app/shared/constants/constantVariables';
import { AuthResponseInterface } from '../types/authResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public register(
    data: RegisterRequestInterface
  ): Observable<CurrentUserInterface> {
    const url = constantVariables.backendApiUrl + '/users';
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(
        map(
          (response: AuthResponseInterface): CurrentUserInterface =>
            response.user
        )
      );
  }
}

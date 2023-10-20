import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { Observable, map } from 'rxjs';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { constantVariables } from 'src/app/shared/constants/constantVariables';
import { AuthResponseInterface } from '../types/authResponse.interface';
import { LoginRequestInterface } from '../types/loginRequest.interface';
import { CurrentUserRequestInterface } from 'src/app/shared/types/currentUserRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user;
  }

  public getCurrentUser(): Observable<CurrentUserInterface> {
    const url = constantVariables.backendApiUrl + '/user';
    return this.http.get<AuthResponseInterface>(url).pipe(map(this.getUser));
  }

  public register(
    data: RegisterRequestInterface
  ): Observable<CurrentUserInterface> {
    const url = constantVariables.backendApiUrl + '/users';
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser));
  }

  public login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = constantVariables.backendApiUrl + '/users/login';
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser));
  }

  public updateCurrentUser(
    currentUserRequest: CurrentUserRequestInterface
  ): Observable<CurrentUserInterface> {
    const url = constantVariables.backendApiUrl + '/user';
    return this.http
      .put<AuthResponseInterface>(url, currentUserRequest)
      .pipe(map(this.getUser));
  }
}

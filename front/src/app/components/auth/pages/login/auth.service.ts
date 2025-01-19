import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> =
    this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkAuthStatus();
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${environment.api}/auth/login`, credentials).pipe(
      tap((response) => {
        sessionStorage.setItem('access_token', response.access_token);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  logout() {
    sessionStorage.removeItem('access_token');
    this.isAuthenticatedSubject.next(false);
  }

  getToken(): string | null {
    return sessionStorage.getItem('access_token');
  }

  private checkAuthStatus() {
    const token = this.getToken();
    this.isAuthenticatedSubject.next(!!token);
  }
}

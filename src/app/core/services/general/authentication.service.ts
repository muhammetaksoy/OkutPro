import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { Endpoint } from '@core/enums/endpoint.enum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private tokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public token$: Observable<any> = this.tokenSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      this.setToken(token);
    }
  }

  login(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + Endpoint.auth_login, data).pipe(
      tap((response: any) => {
        this.setToken(response.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }

  register(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + Endpoint.auth_register, data);
  }


  addPhoneNumber(phoneNumber: string): Observable<any> {
    return this.http.get(environment.apiUrl + Endpoint.auth_addPhoneNumber + "?phoneNumber=+90" + phoneNumber);
  }

  verifySms(smsCode: string): Observable<any> {
    return this.http.get(environment.apiUrl + Endpoint.auth_verifySms + "?input=" + smsCode);
  }

  getUser(): Observable<any> {
    return this.http.get(environment.apiUrl + Endpoint.auth_getUser);
  }


  setToken(token: string): void {
    localStorage.setItem('access_token', token);
    this.tokenSubject.next(token);
  }

  unsetToken(): void {
    localStorage.removeItem('access_token');
    this.tokenSubject.next(null);
  }

  getToken(): any {
    return localStorage.getItem('access_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

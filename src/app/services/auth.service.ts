import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const AUTH_API = `${environment.apiUrl}/auth/`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // Registro
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${AUTH_API}signup`, {
      username,
      email,
      password
    }, httpOptions);
  }

  // Login
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${AUTH_API}signin`, {
      username,
      password
    }, httpOptions);
  }
}
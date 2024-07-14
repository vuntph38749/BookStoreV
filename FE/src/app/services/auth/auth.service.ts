import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string | null = null;
  private apiUrl = 'http://localhost:8000/api/auth'
  constructor(private http: HttpClient) { }
  setToken(token: string) {
    this.token = token;
  } 
  getToken() {
    return this.token;
  }

  checkLogin(data: any) {
    const urlRes = this.apiUrl + '/login'
    return this.http.post(urlRes, data)

  }
  register(data: any) {
    const urlRes = this.apiUrl + '/register'
    return this.http.post(urlRes, data)
  }
}

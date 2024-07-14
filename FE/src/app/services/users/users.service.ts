import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:8000/api/users'

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl)
  }

  updateUser(id: string, product: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<any>(url, product);
  }
}

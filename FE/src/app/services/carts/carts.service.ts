import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartsService {
  private apiUrl = 'http://localhost:8000/api/carts'
  constructor(private http: HttpClient) { }
  getcartUser(id:string|number) {
    return this.http.get(this.apiUrl+`?id=${id}`)
  }

  deleteCart(id: number | string) {
    return this.http.delete(this.apiUrl + `/${id}`)

  }

  addToCart(data: any) {
    return this.http.post(this.apiUrl, data)

  }
  editCart(id: number | string,data: any) {
    return this.http.patch(this.apiUrl + `/${id}`, data)

  }
}

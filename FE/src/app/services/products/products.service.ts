import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:8000/api/products'
  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl)
  }

  getProduct(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  createProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }

  updateProduct(id: string, product: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<any>(url, product);
  }

  deleteProduct(id: string ): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}

import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiUrl = 'http://localhost:8000/api/categories'
  constructor(private http: HttpClient) { }


  getAllCategories() {
    return this.http.get(this.apiUrl)
  }

  getOneCategory(id: number | string) {
    return this.http.get(this.apiUrl + `/${id}`)

  }
  deleteCate(id: number | string) {
    return this.http.delete(this.apiUrl + `/${id}`)

  }
  createCate(data: any) {
    return this.http.post(this.apiUrl, data)

  }
  updateCate(id: number | string, data: any) {
    return this.http.patch(this.apiUrl + `/${id}`, data)

  }
}

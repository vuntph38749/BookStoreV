import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedbacksService {
  private apiUrl = 'http://localhost:8000/api/feedbacks'
  constructor(private http: HttpClient) { }
  getAllFeedbacks() {
    return this.http.get(this.apiUrl)
  }

  getFeedbackOfProduct(idProduct: number | string){
    return this.http.get(this.apiUrl + `/${idProduct}`)
  }

  addfeedbackOfProduct(data:any){
    return this.http.post(this.apiUrl,data)
  }

  deleteFeedback(id: number | string) {
    return this.http.delete(this.apiUrl + `/${id}`)

  }

}

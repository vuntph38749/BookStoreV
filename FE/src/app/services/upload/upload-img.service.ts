import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadImgService {
  private apiUrl = 'http://localhost:8000/api/upload/cloudinary-upload'
  constructor(private http: HttpClient) { }


  Upload(data:any): Observable<any> {
    return this.http.post<any>(this.apiUrl,data)
  }
}

import { Injectable } from '@angular/core';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LocaStoreService {

  constructor() { }
  setStore(name: string,data:any){
    return localStorage.setItem(name,JSON.stringify(data))
  }
  getStore(name: string) {
    const data = JSON.parse(localStorage.getItem(name) || "{}");
    return of(data);
  }
  removeStore(name: string){
    return localStorage.removeItem(name)
  }
}

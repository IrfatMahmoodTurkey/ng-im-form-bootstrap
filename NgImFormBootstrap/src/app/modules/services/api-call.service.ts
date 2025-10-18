import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class APICallService {
  constructor(private http: HttpClient) {}

  postJson(url: string, jsonObject: any): Observable<string> {
    return this.http.post<string>(url, jsonObject);
  }
}

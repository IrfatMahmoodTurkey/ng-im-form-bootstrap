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

  postFormData(url: string, object: any): Observable<string> {
    const formData: any = new FormData();

    for (const key in object) {
      formData.append(key, object[key]);
    }

    for (const pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    return this.http.post<string>(url, formData);
  }
}

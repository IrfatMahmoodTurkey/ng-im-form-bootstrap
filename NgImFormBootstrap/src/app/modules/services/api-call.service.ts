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
    const formData: FormData = new FormData();

    for (const key in object) {
      if (Array.isArray(object[key])) {
        for (const element of object[key]) {
          formData.append(key, element);
        }

        continue;
      }

      formData.append(key, object[key]);
    }

    return this.http.post<string>(url, formData);
  }
}

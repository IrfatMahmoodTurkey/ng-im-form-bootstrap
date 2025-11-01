import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIMethodsEnum } from '../../enums/api-methods.enum';

@Injectable({
  providedIn: 'any',
})
export class APICallService {
  constructor(private http: HttpClient) {}

  sendJSONOnly(
    url: string,
    jsonObject: any,
    method: APIMethodsEnum
  ): Observable<string> {
    if (method === APIMethodsEnum.POST) {
      return this.http.post<string>(url, jsonObject);
    } else if (method === APIMethodsEnum.PATCH) {
      return this.http.patch<string>(url, jsonObject);
    } else {
      return this.http.put<string>(url, jsonObject);
    }
  }

  sendFormData(
    url: string,
    object: any,
    method: APIMethodsEnum
  ): Observable<string> {
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

    if (method === APIMethodsEnum.POST) {
      return this.http.post<string>(url, formData);
    } else if (method === APIMethodsEnum.PUT) {
      return this.http.put<string>(url, formData);
    } else {
      return this.http.patch<string>(url, formData);
    }
  }
}

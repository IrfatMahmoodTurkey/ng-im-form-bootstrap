import {
  HttpClient,
  HttpParams,
  HttpParamsOptions,
} from '@angular/common/http';
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
    queryParamsMap: Map<string, string> | null | undefined,
    jsonObject: any,
    method: APIMethodsEnum
  ): Observable<string> {
    let httpParams: HttpParams = new HttpParams();

    if (queryParamsMap) {
      for (const pair of queryParamsMap) {
        const [key, value] = pair;

        httpParams = httpParams.append(key, value);
      }
    }

    if (method === APIMethodsEnum.POST) {
      return this.http.post<string>(url, jsonObject, { params: httpParams });
    } else if (method === APIMethodsEnum.PATCH) {
      return this.http.patch<string>(url, jsonObject, { params: httpParams });
    } else {
      return this.http.put<string>(url, jsonObject, { params: httpParams });
    }
  }

  sendFormData(
    url: string,
    queryParamsMap: Map<string, string> | null | undefined,
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

    let httpParams: HttpParams = new HttpParams();

    if (queryParamsMap) {
      for (const pair of queryParamsMap) {
        const [key, value] = pair;

        httpParams = httpParams.append(key, value);
      }
    }

    if (method === APIMethodsEnum.POST) {
      return this.http.post<string>(url, formData, { params: httpParams });
    } else if (method === APIMethodsEnum.PUT) {
      return this.http.put<string>(url, formData, { params: httpParams });
    } else {
      return this.http.patch<string>(url, formData, { params: httpParams });
    }
  }
}

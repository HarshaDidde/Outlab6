import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CssSelector } from '@angular/compiler';

export interface Form_Data {
  name: string;
  email: string;
  feedback: string;
  comment: string;
}

@Injectable({
  providedIn: 'root',
})
export class FormService {
  getUrl = 'https://cs251-outlab-6.herokuapp.com/initial_values/';
  postUrl = 'https://cs251-outlab-6.herokuapp.com/add_new_feedback/';
  constructor(private http: HttpClient) {}

  getFormData() {
    return this.http.get<Form_Data>(this.getUrl);
  }

  postFormData(data: JSON) {
    const headers1 = new HttpHeaders();
    headers1.append('Content-Type', 'application/json');
    return this.http.post<any>(this.postUrl, data, { headers: headers1 });
  }
}

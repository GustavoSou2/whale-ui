import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { CookieService } from 'ngx-cookie-service';

class ResponseOfMany<T> {
  constructor(data: T[]) {
    return {
      length: data.length,
      values: data,
    };
  }
}

class ResponseOfOne<T> {
  constructor(data: T) {
    return {
      length: 1,
      values: data,
    };
  }
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private cookieService = inject(CookieService);
  private baseUrl = `${environment.apiURL}/api`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = this.cookieService.get('token');

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  get<T>(endpoint: string, params?: any): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/${endpoint}`, {
      headers: this.getHeaders(),
      params,
    });
  }

  post<T>(endpoint: string, data: any): Observable<ResponseOfOne<T>> {
    return this.http
      .post<T>(`${this.baseUrl}/${endpoint}`, data, {
        headers: this.getHeaders(),
      })
      .pipe(map((data: T) => new ResponseOfOne(data)));
  }

  put<T>(endpoint: string, data: any): Observable<ResponseOfOne<T>> {
    return this.http
      .put<T>(`${this.baseUrl}/${endpoint}`, data, {
        headers: this.getHeaders(),
      })
      .pipe(map((data: T) => new ResponseOfOne(data)));
  }

  patch<T>(endpoint: string, body: any): Observable<ResponseOfOne<T>> {
    return this.http
      .patch<T>(`${this.baseUrl}/${endpoint}`, body, {
        headers: this.getHeaders(),
      })
      .pipe(map((data: T) => new ResponseOfOne(data)));
  }

  delete<T>(endpoint: string): Observable<ResponseOfOne<T>> {
    return this.http
      .delete<T>(`${this.baseUrl}/${endpoint}`, {
        headers: this.getHeaders(),
      })
      .pipe(map((data: T) => new ResponseOfOne(data)));
  }
}

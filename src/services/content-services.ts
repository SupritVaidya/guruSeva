import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContentServices {
  //private apiUrl = 'http://localhost:5256/api/Contents';
  private apiUrl = `${environment.apiUrl}/Contents`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  searchByEnglishName(term: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/by-english-name/${encodeURIComponent(term)}`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  create(content: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, content);
  }

  update(id: number, content: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, content);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

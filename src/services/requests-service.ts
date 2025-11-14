import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  private apiUrl = 'http://localhost:5256/api/AdminRequests';

  constructor(private http: HttpClient) {}

  getRequests() {
    return this.http.get<any[]>(this.apiUrl);
  }

  approveRequest(id: number) {
    // Call backend approve endpoint
    return this.http.put(`${this.apiUrl}/approve/${id}`, {});
  }

  denyRequest(id: number) {
    // Implement deny logic (e.g., DELETE or POST to deny endpoint)
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

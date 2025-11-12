import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginServices {
  private apiUrl = 'http://localhost:5256/api/Users/login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<any>(this.apiUrl, { email, password });
  }

  register(name: string, email: string, password: string) {
    // Adjust the payload keys to match your backend User model
    return this.http.post<any>('http://localhost:5256/api/Users', {
      name,
      email,
      password,
      isApproved: false// New users require approval by default
    });
  }
}

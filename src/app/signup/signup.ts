import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServices } from '../../services/login-services';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  name = '';
  email = '';
  password = '';
  signupError = '';
  signupSuccess = '';

  constructor(private loginService: LoginServices, private router: Router) {}

  onSubmit() {
    this.signupError = '';
    this.signupSuccess = '';
    // Call backend to create user (POST /api/Users)
    this.loginService.register(this.name, this.email, this.password).subscribe({
      next: (user) => {
        this.signupSuccess = 'Signup successful! Please wait for approval.';
        this.name = '';
        this.email = '';
        this.password = '';
      },
      error: (err) => {
        this.signupError = err?.error?.message || 'Signup failed. Please try again.';
      }
    });
  }
}

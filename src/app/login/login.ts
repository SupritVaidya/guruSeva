
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginServices } from '../../services/login-services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email = '';
  password = '';
  rememberMe = false;
  loginError = '';

  constructor(private router: Router, private loginService: LoginServices) {}

  onSubmit() {
    this.loginError = '';
    this.loginService.login(this.email, this.password).subscribe({
      next: (user) => {
        if (user && (user.isApproved === true || user.IsApproved === true)) {
          this.router.navigate(['/dashboard']);
        } else if (user && (user.isApproved === false || user.IsApproved === false)) {
          this.loginError = 'Request for approval pending';
        } else {
          this.loginError = 'Invalid email or password.';
        }
      },
      error: (err) => {
        if (err?.status === 401) {
          this.loginError = 'Invalid email or password.';
        } else {
          this.loginError = 'Login failed. Please try again.';
        }
      }
    });
  }
}

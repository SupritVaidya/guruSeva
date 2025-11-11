import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email = '';
  password = '';
  rememberMe = false;

  onSubmit() {
    // For demo: just alert the form values
    alert(`Email: ${this.email}\nPassword: ${this.password}\nRemember Me: ${this.rememberMe}`);
  }
}

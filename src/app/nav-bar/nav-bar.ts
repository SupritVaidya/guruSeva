import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {
  isAdmin = false;

  constructor(private router: Router) {
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
  }

  logout() {
    localStorage.removeItem('isAdmin');
    this.router.navigate(['/']);
  }
}

import { Component } from '@angular/core';
import { Card } from "../card/card";
import { NavBar } from "../nav-bar/nav-bar";
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  imports: [NavBar],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.scss',
})
export class AdminPanel {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  openRequests() {
    this.router.navigate(['/requests']);
  }
}

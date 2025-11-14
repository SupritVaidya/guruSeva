import { Component } from '@angular/core';
import { NavBar } from "../nav-bar/nav-bar";
import { RequestsService } from '../../services/requests-service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-requests',
  imports: [NavBar, CommonModule, RouterModule],
  templateUrl: './requests.html',
  styleUrl: './requests.scss',
  providers: [RequestsService]
})
export class Requests implements OnInit {
  requests: any[] = [];
  loading = true;
  error = '';

  constructor(private requestsService: RequestsService) {}

  ngOnInit() {
    this.fetchRequests();
  }

  fetchRequests() {
    this.loading = true;
    this.requestsService.getRequests().subscribe({
      next: (data) => {
        this.requests = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load requests.';
        this.loading = false;
      }
    });
  }

  approve(id: number) {
    this.requestsService.approveRequest(id).subscribe(() => this.fetchRequests());
  }

  deny(id: number) {
    this.requestsService.denyRequest(id).subscribe(() => this.fetchRequests());
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../card/card';
import { ContentServices } from '../../services/content-services';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, Card],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  contents: any[] = [];

  constructor(private contentService: ContentServices) {}

  ngOnInit() {
    this.contentService.getAll().subscribe({
      next: (data: any[]) => this.contents = data,
      error: (err: any) => console.error('Failed to fetch contents', err)
    });
  }

  openContent(content: any) {
    // For now, just alert. Replace with router navigation or modal as needed.
    alert(`Open content: ${content.name || content.nameEnglish || content.id}`);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentServices } from '../../services/content-services';

@Component({
  selector: 'app-card-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-content.html',
  styleUrl: './card-content.scss',
})
export class CardContent implements OnInit {
  content: any;

  constructor(private route: ActivatedRoute, private contentService: ContentServices, private router: Router) {}
  goBack() {
    this.router.navigate(['/dashboard']);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.contentService.getById(+id).subscribe({
        next: (data) => this.content = data,
        error: (err) => console.error('Failed to fetch content', err)
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentServices } from '../../services/content-services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-content-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './content-details.html',
  styleUrl: './content-details.scss',
})
export class ContentDetails implements OnInit {
  content: any = {};
  loading = true;
  saving = false;
  saveSuccess = false;
  saveError = '';
  constructor(private route: ActivatedRoute, private contentService: ContentServices, private router: Router) {}
  goBack() {
    const id = this.content.id || this.content.Id;
    if (id) {
      this.router.navigate(['/content', id]);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.contentService.getById(+id).subscribe({
          next: (data) => {
            this.content = data;
            this.loading = false;
          },
          error: (err) => {
            this.loading = false;
            // handle error
          }
        });
      }
    });
  }

  onSave() {
    if (!this.content?.id && !this.content?.Id) return;
    this.saving = true;
    this.saveSuccess = false;
    this.saveError = '';
    const id = this.content.id || this.content.Id;
    this.contentService.update(id, this.content).subscribe({
      next: () => {
        this.saving = false;
        this.saveSuccess = true;
      },
      error: (err) => {
        this.saving = false;
        this.saveError = 'Failed to save changes.';
      }
    });
  }
}

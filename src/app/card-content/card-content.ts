import { ElementRef, HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentServices } from '../../services/content-services';
import { NavBar } from "../nav-bar/nav-bar";

@Component({
  selector: 'app-card-content',
  standalone: true,
  imports: [CommonModule, NavBar],
  templateUrl: './card-content.html',
  styleUrl: './card-content.scss',
})
export class CardContent implements OnInit {
    menuOpen: boolean = false;
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }
  content: any;
  allContents: any[] = [];
  isAdmin = false;

  constructor(private route: ActivatedRoute, private contentService: ContentServices, private router: Router, private elRef: ElementRef) {
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.menuOpen) return;
    const menu = this.elRef.nativeElement.querySelector('.position-absolute.bg-white');
    const button = this.elRef.nativeElement.querySelector('button[aria-label="Show content list"]');
    if (menu && !menu.contains(event.target as Node) && button && !button.contains(event.target as Node)) {
      this.menuOpen = false;
    }
  }

  editContent(id: number) {
    this.router.navigate(['/content', id, 'edit']);
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  ngOnInit() {
    // Fetch all content names for the index
    this.contentService.getAll().subscribe({
      next: (data) => this.allContents = data,
      error: (err) => console.error('Failed to fetch all contents', err)
    });

    // Subscribe to route param changes to reload content on navigation
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.contentService.getById(+id).subscribe({
          next: (data) => this.content = data,
          error: (err) => console.error('Failed to fetch content', err)
        });
      }
    });
  }

  openContent(id: number) {
    this.menuOpen = false;
    this.router.navigate(['/content', id]);
  }
}

import { ElementRef, HostListener } from '@angular/core';
import Swiper from 'swiper';
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
      private touchStartX: number = 0;
      private touchEndX: number = 0;

      onTouchStart(event: TouchEvent) {
        this.touchStartX = event.changedTouches[0].screenX;
      }

      onTouchEnd(event: TouchEvent) {
        this.touchEndX = event.changedTouches[0].screenX;
        this.handleSwipe();
      }

      handleSwipe() {
        const deltaX = this.touchEndX - this.touchStartX;
        if (Math.abs(deltaX) > 50) { // threshold for swipe
          if (deltaX < 0) {
            this.goToNextContent(); // swipe left
          } else {
            this.goToPreviousContent(); // swipe right
          }
        }
      }
    menuOpen: boolean = false;
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
      if (this.menuOpen && this.content) {
        setTimeout(() => {
          const el = document.getElementById('content-item-' + this.content.id);
          if (el) {
            el.scrollIntoView({ block: 'center', behavior: 'smooth' });
          }
        }, 100);
      }
    }
  content: any;
  allContents: any[] = [];
  isAdmin = false;
  swiper?: Swiper;

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

  goToPreviousContent() {
    if (!this.content || !this.allContents.length) return;
    const currentIndex = this.allContents.findIndex(item => item.id === this.content.id);
    if (currentIndex > 0) {
      const prevId = this.allContents[currentIndex - 1].id;
      this.openContent(prevId);
    }
  }

  goToNextContent() {
    if (!this.content || !this.allContents.length) return;
    const currentIndex = this.allContents.findIndex(item => item.id === this.content.id);
    if (currentIndex < this.allContents.length - 1) {
      const nextId = this.allContents[currentIndex + 1].id;
      this.openContent(nextId);
    }
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  ngOnInit() {
    // Fetch all content names for the index
    this.contentService.getAll().subscribe({
      next: (data) => {
        this.allContents = data;
        setTimeout(() => this.initSwiper(), 0);
      },
      error: (err) => console.error('Failed to fetch all contents', err)
    });

    // Subscribe to route param changes to reload content on navigation
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.contentService.getById(+id).subscribe({
          next: (data) => {
            this.content = data;
            setTimeout(() => this.slideToCurrent(), 0);
          },
          error: (err) => console.error('Failed to fetch content', err)
        });
      }
    });
  }

  initSwiper() {
    if (this.swiper) return;
    const swiperEl = document.querySelector('.swiper-container');
    if (swiperEl) {
      this.swiper = new Swiper(swiperEl as HTMLElement, {
        slidesPerView: 1,
        spaceBetween: 30,
        on: {
          slideChange: () => {
            const idx = this.swiper?.activeIndex ?? 0;
            if (this.allContents[idx]) {
              this.openContent(this.allContents[idx].id);
            }
          }
        }
      });
      this.slideToCurrent();
    }
  }

  slideToCurrent() {
    if (!this.swiper || !this.content) return;
    const idx = this.allContents.findIndex(item => item.id === this.content.id);
    if (idx >= 0) {
      this.swiper.slideTo(idx);
    }
  }

  openContent(id: number) {
    this.menuOpen = false;
    this.router.navigate(['/content', id]);
  }
}

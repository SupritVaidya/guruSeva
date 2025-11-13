
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Card } from '../card/card';
import { ContentServices } from '../../services/content-services';
import { NavBar } from "../nav-bar/nav-bar";
import { SearchBar } from "../search-bar/search-bar";
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, Card, NavBar, SearchBar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  contents: any[] = [];
  private searchTerm$ = new Subject<string>();

  constructor(private contentService: ContentServices, private router: Router) {
    this.searchTerm$
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(term => {
        if (term && term.trim() !== '') {
          this.contentService.searchByEnglishName(term).subscribe({
            next: (data: any[]) => this.contents = data,
            error: (err: any) => this.contents = []
          });
        } else {
          this.loadAll();
        }
      });
  }

  ngOnInit() {
    this.loadAll();
  }

  onSearchTermChange(term: string) {
    this.searchTerm$.next(term);
  }

  loadAll() {
    this.contentService.getAll().subscribe({
      next: (data: any[]) => this.contents = data,
      error: (err: any) => this.contents = []
    });
  }

  openContent(content: any) {
    this.router.navigate(['/content', content.id]);
  }
}


import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
})
export class SearchBar {
  searchTerm: string = '';
  @Output() searchTermChange = new EventEmitter<string>();

  onInputChange() {
    this.searchTermChange.emit(this.searchTerm);
  }

  onSearch() {
    this.searchTermChange.emit(this.searchTerm);
  }
}

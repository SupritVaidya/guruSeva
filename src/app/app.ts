import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from "./login/login";
import { AdminPanel } from "./admin-panel/admin-panel";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login, AdminPanel],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('guruseva');
}

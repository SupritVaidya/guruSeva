import { Component } from '@angular/core';
import { Card } from "../card/card";
import { NavBar } from "../nav-bar/nav-bar";

@Component({
  selector: 'app-admin-panel',
  imports: [Card, NavBar],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.scss',
})
export class AdminPanel {

}

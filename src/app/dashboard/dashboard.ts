import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../card/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, Card],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  courses = [
    {
      id: 1,
      level: 'A1',
      title: 'German for Beginners',
      description: 'Start your German journey with the absolute basics, from greetings to ordering coffee.',
      progress: 22.22
    },
    {
      id: 2,
      level: 'A2',
      title: 'Elementary German',
      description: 'Build on your basic knowledge to handle simple, routine tasks and conversations.',
      progress: 0.00
    }
  ];

  openCourse(course: any) {
    // For now, just alert. Replace with router navigation or modal as needed.
    alert(`Open course: ${course.title}`);
  }
}

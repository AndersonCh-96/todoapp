import { Component, signal } from '@angular/core';
import { Todo } from '../../interfaces/todo';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  data = signal([
    {
      id:1,
      title: 'primera',
      complete: false,
      editing:false
    }
  ])
}

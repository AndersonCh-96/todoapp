import { Component, signal } from '@angular/core';
import { Todo, filterType } from '../../interfaces/todo';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  data = signal<Todo[]>([
    {
      id: 1,
      title: 'Ingresar al sistem',
      complete: false,
      editing: false,
    },
    {
      id: 2,
      title: 'Beber agua',
      complete: false,
      editing: false,
    },
    {
      id: 3,
      title: 'Hacer ejercicio',
      complete: false,
      editing: false,
    },
  ]);
  filter = signal<filterType>('all');

  tarea = new FormControl('', Validators.required);

  changeFilter(filtra: filterType) {
    this.filter.set(filtra);
  }

  addTask() {
    if (this.tarea.valid && this.tarea.value?.trim() != '') {
      const inp = this.tarea.value!.trim();
      const newData = {
        id: Date.now(),
        title: inp,
        complete: false,
        editing: false,
      };
      this.data.update((a) => {
        return [...a, newData];
      });
      this.tarea.reset();
    }
    console.log(this.tarea);
  }

  deleteTask(id: number) {
    this.data.update((a) => {
      return a.filter((b, index) => index != id);
    });
  }
}

import { Component, computed, effect, signal } from '@angular/core';
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
  ]);
  filter = signal<filterType>('all');
  tarea = new FormControl('', Validators.required);

  filtra = computed(() => {
    const filt = this.filter();
    const tasKs = this.data();
    if (filt === 'complete') {
      return tasKs.filter((d) => d.complete);
    } else if (filt === 'active') {
      return tasKs.filter((d) => !d.complete);
    } else {
      return tasKs;
    }
  });

  constructor() {
    effect(() => {
      localStorage.setItem('tareas', JSON.stringify(this.data()));
    });
  }
  ngOnInit() {
    const inf = localStorage.getItem('tareas');
    if (inf) {
      this.data.set(JSON.parse(inf));
    }
  }

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

  toogle(id: number) {
    this.data.update((a) =>
      a.map((newdate, index) => {
        if (index === id) {
          return {
            ...newdate,
            complete: !newdate.complete,
          };
        }
        return {
          ...newdate,
        };
      })
    );
  }

  edit(id: number) {
    this.data.update((a) =>
      a.map((d, index) => {
        if (id === index) {
          return {
            ...d,
            editing: true,
          };
        }
        return {
          ...d,
        };
      })
    );
  }

  updatedate(id: number, titulo: Event) {
    const da = (titulo.target as HTMLInputElement).value;

    this.data.update((a) =>
      a.map((d, index) => {
        return id === index ? { ...d, title: da, editing: false } : d;
      })
    );
  }
}

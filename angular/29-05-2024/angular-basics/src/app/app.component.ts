import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TodoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  styles: [`
  h2{
    color: blue;
  }
  `],
})
export class AppComponent {
  title = 'angular-basics';
}

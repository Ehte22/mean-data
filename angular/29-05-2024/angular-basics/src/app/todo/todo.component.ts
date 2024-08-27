import { Component } from '@angular/core';
import { TodoChildComponent } from '../todo-child/todo-child.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [TodoChildComponent, FormsModule, CommonModule],
  templateUrl: './todo.component.html',
  // template: `<app-todo-child></app-todo-child>`,
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  name: string = ""
  data: string = "Hello from Parent"
  users: string[] = ["john", "kate", "ross"]
  show: boolean = false

  handleShow() {
    this.show = true
  }


  updateUser(arg: string[]) {
    this.users = arg
  }
}

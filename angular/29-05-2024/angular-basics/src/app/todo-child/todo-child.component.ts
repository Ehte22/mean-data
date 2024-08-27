import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-todo-child',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './todo-child.component.html',
    styleUrl: './todo-child.component.css',
    styles: [`
    .moreThan25{
        color: white;
    }
    `]
})
export class TodoChildComponent {
    userData = ["rachel", "john", "mike"]
    num1 = 10
    num2 = 20
    @Input() data: string = ''
    @Input() users: string[] = []

    @Output() updateUserFn = new EventEmitter()

    constructor() {
        this.num1 = Math.random() > 0.5 ? 2 : 10
    }

    sum() {
        return this.num1 + this.num2
    }

    test() {
        this.updateUserFn.emit(this.userData)
    }

    getColor() {
        return (this.num1 + this.num2 > 25) ? 'green' : 'red'
    }
}
interface TODO {
    id?: number,
    task: string,
    desc: string,
    priority: number,
    complete?: boolean
}


class Todo {
    // public name: string; // Accessible from anywhere
    // private age: number; // Accessible only within this class
    // protected type: string; // Accessible within this class and subclasses


    private ALL_TODOS: TODO[] = []

    addTodo(data: TODO) {
        return this.ALL_TODOS.push({ ...data, id: this.ALL_TODOS.length + 1 })
    }

    getTodos() {
        return this.ALL_TODOS
    }

    updateTodo(id: number, data: TODO) {
        const index = this.ALL_TODOS.findIndex(item => item.id === id)

        this.ALL_TODOS[index] = { ...this.ALL_TODOS[index], ...data }
        return this.ALL_TODOS
    }

    deleteTodo(id: number) {
        this.ALL_TODOS = this.ALL_TODOS.filter(item => item.id !== id)
        return this.ALL_TODOS
    }
}

const todoData = new Todo()

todoData.addTodo({ task: "task 1", desc: "lorem ipsum", priority: 1 })
todoData.addTodo({ task: "task 2", desc: "lorem ipsum", priority: 3 })
todoData.addTodo({ task: "task 3", desc: "lorem ipsum", priority: 5 })

todoData.updateTodo(1, { task: "task updated", desc: "desc updated", priority: 1 })

todoData.deleteTodo(2)


console.log(todoData.getTodos());

// another example
class Sum {
    constructor(private num1: number, private num2: number) {
    }

    getSum() {
        console.log(`sum of ${this.num1} + ${this.num2} is ${this.num1 + this.num2}`);

    }
}

class Nums extends Sum {
    constructor(num1: number, num2: number) {
        super(num1, num2)
    }
}

const nums = new Nums(10, 20)

nums.getSum()





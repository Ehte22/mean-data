import { Injectable } from "@angular/core";

// @Injectable({
//     providedIn: "root"
// })
export class counterService {
    counter: number = 0

    increment(componentName: string) {
        console.log(componentName + ": " + this.counter++);

    }
}
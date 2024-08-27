export function sum(n1: number, n2: number) {
    return `sum of ${n1} + ${n2} is ${n1 + n2}`
}

export const PI = 3.14

export default class Circle {
    constructor(private raduis: number) { }

    area() {
        return PI * this.raduis * this.raduis
    }
}

export let brands: string[]
brands = ["dell", "hp", "apple"]
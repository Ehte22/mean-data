// Iterators
function brandsIterator(values) {
    let nextIndex = 0
    return {
        next: () => {
            if (nextIndex < values.length) {
                return {
                    value: values[nextIndex++],
                    done: false
                }
            }
            else {
                return {
                    done: true
                }
            }
        }
    }
}

const arr = ["dell", "hp", "apple", "asus"]

const brands = brandsIterator(arr)

console.log(brands.next());
console.log(brands.next());
console.log(brands.next());
console.log(brands.next());
console.log(brands.next());

// genrators

function* numbersGen() {
    let i = 0

    // yield 1;
    // yield 2;
    // yield 3;
    // yield 4;

    while (true) {
        yield i++;
    }
}

const gen = numbersGen()

console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
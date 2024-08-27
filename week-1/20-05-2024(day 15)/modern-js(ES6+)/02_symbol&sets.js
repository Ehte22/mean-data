// symbols

const sym1 = Symbol("My Identifier")
const sym2 = Symbol("My Identifier")

console.log(sym1 === sym2); // false

const k1 = Symbol("identifier of k1")
const k2 = Symbol("identifier of k2")

const obj = {

}
obj[k1] = "john"
obj[k2] = "kate"
console.log(obj);


// set and map

// set
const mySet = new Set()

mySet.add(1)
mySet.add(2)
mySet.add(3)

console.log(mySet);
console.log(mySet.has(1));
console.log(mySet.has(3));
console.log(mySet.has(4));

mySet.delete(3)
console.log(mySet);
console.log("size:", mySet.size);

mySet.add(3)
for (const item of mySet) {
    console.log(item);
}

const myArr = Array.from(mySet)
console.log(myArr);

// maps

// creating a map
const myMap = new Map()

// adding key values
myMap.set("a", 1)
myMap.set("b", 2)

console.log(myMap);

// getting vlaues
console.log(myMap.get("a"));
console.log(myMap.get("b"));

// checking for keys
console.log(myMap.has("a"));
console.log(myMap.has("b"));

myMap.delete("b")
console.log(myMap);

myMap.set("c", 3)
for (const [key, value] of myMap) {
    console.log(`${key}: ${value}`);
}


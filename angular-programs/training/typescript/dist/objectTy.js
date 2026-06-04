"use strict";
//object typing
Object.defineProperty(exports, "__esModule", { value: true });
//Object typing in TypeScript allows you to define the structure of objects,
//  including the properties they should have and the types of those properties.
// This helps catch errors at compile time and provides better code readability and maintainability.
const employee = {
    id: 101,
    name: "Kusuma",
    department: "IT"
};
//employee.name = 123;
console.log(employee.id);
console.log(employee.name);
console.log(employee.department);
//Optional properties
// use ? to mark a property as OptionalEffectTiming, meaning it may or may not be present in the object
const user = {
    id: 1,
    name: "Teja"
};
console.log(user.id);
const product = {
    id: 1,
    name: "laptop",
    price: 999.99
};
//product.name="Desktop"; //error anem is readonly
//Arrays of objects
const users = [
    { id: 1, name: "Kusuma" },
    { id: 2, name: "Teja" },
    { id: 3, name: "Hemanth" },
    { id: 4, name: "Maha" }
];
if (users[0]) {
    console.log(users[0].name);
}
if (users[1]) {
    console.log(users[1].id);
}
//tuples - special type of array
let userInfo;
userInfo = [101, "Kusuma", true];
//userInfo = [false, "Teja", true]; //wrong order
function getUserInfo() {
    return [101, "kusuma", true];
}
let result = getUserInfo();
console.log(result[0]);
console.log(result[1]);
console.log(result[2]);
const products = [
    { id: 1, name: "Laptop", price: 999.99 },
    { id: 2, name: "Smartphone", price: 499.99, description: "Latest model" },
    { id: 3, name: "Headphones", price: 199.99 }
];

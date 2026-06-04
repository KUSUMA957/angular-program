"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let x = 100;
let name = "Rashmi";
// compilitation flow
// Typescript(.ts)---->Typescript Compiler(tsc)--->JavaScript(.js)---Browser/Node.js runtime
// Data types:
// Number:
let age = 42;
let salary = 12345;
console.log(age);
console.log(salary);
let firstName = "Kavya";
console.log(firstName);
let city = "Bangalurur";
let message = `Wel come to ${city}`;
console.log(message);
Boolean;
let isActive = true;
console.log(isActive);
let marks = 75;
let isPassed = marks > 40;
console.log("Passes:", isPassed);
//1.Number Array:
let numbers = [1, 2, 3, 4, 5, 6];
console.log(numbers);
//2.String arrays:
let names = ["Kavya", "Preethi", "Himaja"];
for (let name of names) {
    console.log(name);
}
//Tuples:[string,number]
let user = ["Kavys", 30];
console.log(user[0]);
console.log(user[1]);
let readOnlyTuples = ["key", 100];
var role;
(function (role) {
    role[role["Admin"] = 0] = "Admin";
    role[role["User"] = 1] = "User";
    role[role["Guest"] = 2] = "Guest";
})(role || (role = {}));
let myRole = role.Admin;
console.log(myRole);
var weeks;
(function (weeks) {
    weeks[weeks["Sunday"] = 0] = "Sunday";
    weeks[weeks["monday"] = 1] = "monday";
    weeks[weeks["tuesday"] = 2] = "tuesday";
    weeks[weeks["wednesday"] = 3] = "wednesday";
})(weeks || (weeks = {}));
var Status;
(function (Status) {
    Status[Status["Pending"] = 1] = "Pending";
    Status[Status["Approved"] = 2] = "Approved";
    Status[Status["Rejected"] = 3] = "Rejected";
})(Status || (Status = {}));
let data = 10;
data = "Hello";
data = true;
function printValue(value) {
    console.log(value);
}
printValue(100);
printValue("Capgemini");
// unknown 
// -------
let value = "Hello";
if (typeof value === "string")
    console.log(value.toUpperCase());
let input = 50;
if (typeof input === "number")
    console.log(input + 10);
function processInput(input) {
    if (typeof input === "string") {
        return input.toUpperCase();
    }
    if (typeof input === 'number') {
        return `Number: ${input}`;
    }
    return 'Unknown type';
}
console.log(processInput("Hello"));
console.log(processInput(123));
function display() {
    //return "Hello Himaja";
}
function displayName() {
    return "Hello Himaja";
}

"use strict";
// TypeScript starts with a broad type, and then based on some check (if, typeof, instanceof, etc.),
// it narrows the variable to a more specific type inside that block.
Object.defineProperty(exports, "__esModule", { value: true });
function print(value) {
    if (typeof value === "string") {
        console.log("Length of the string:", value.length);
    }
    else {
        console.log("Multiply by 2:", value * 2);
    }
}
print("Kusuma");
print(21);
function greet(name) {
    if (name) {
        console.log("Hello,", name.trim());
    }
    else {
        console.log("Hello, Guest");
    }
}
greet(" Kusuma ");
greet();
function handleStatus(status) {
    if (status === "loading") {
        console.log("Please wait...");
    }
    else if (status === "done") {
        console.log("Finished!");
    }
    else {
        console.log("Idle.");
    }
}
handleStatus("loading");
function printEntity(e) {
    if ("name" in e) {
        console.log(`College: ${e.name} (${e.city})`);
    }
    else {
        console.log(`Student: ${e.firstName} ${e.lastName} | Grade: ${e.grade}`);
    }
}
printEntity({ name: "GVP", city: "VSP" });
printEntity({ firstName: "Kusuma", lastName: "M", grade: 8 });

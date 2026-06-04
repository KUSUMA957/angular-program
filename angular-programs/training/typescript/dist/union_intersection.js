"use strict";
// Union Type and intersection type:
// ---------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
// type--> A type defines what kind of values a variable can store
// 	and what operations are allowed on it.
// 	tells to type script:
// 	What data is allowed
// 	What methods can be used
// 	what is not allowed
let age = 30;
// age --variable
// number --type
// age can store numbers
//age ="Shiva" //Error--type
//let age =30;
//age="Shiva" // allowed causes runtime errors
// types control what you can do.
// -------------------------------
// A | B union type
// A or B
let id;
id = 101;
id = "Shiva";
function login(username) {
    if (username === "admin") {
        return true;
    }
    else {
        return "Invalid user";
    }
}
let result = login("admin");
if (typeof result === 'boolean') {
    console.log("Login Success");
}
else
    console.log(result);
const u = { id: 101, name: "Kavya" };
console.log(u);
//value: unknowninput: unknowndata: anyvalue: anynames: stringinput: unknownstring, number

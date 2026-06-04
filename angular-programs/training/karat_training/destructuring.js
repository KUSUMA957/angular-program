"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const numbers = [10, 20, 30];
const [a, b, c] = numbers;
console.log("Array:", a, b, c);
//      1.Skipping numbers
const [first, , third] = numbers;
console.log("Array Skip:", first, third);
const user = {
    name: "Maya",
    age: 30
};
const { name: userName, age: userAge } = user;
console.log("User:", userName, userAge);
const { country = "India" } = user;
console.log("Country:", country);
//    3. FUNCTION PARAMETER DESTRUCTURING
function greeting({ name, age }) {
    console.log(`${name} is ${age} years old`);
}
greeting({ name: "Anita", age: 28 });
//    4. NESTED DESTRUCTURING
const employee = {
    id: 1,
    address: {
        city: "Chennai",
        pin: 600001
    }
};
const { address: { city } } = employee;
console.log("City:", city);
//    5. INTERFACE + RENAME (NO CONFLICT)
const interfaceUser = { name: "Suresh", age: 35, country: "India" };
const { name: interfaceUserName, age: interfaceUserAge, country: interfaceCountry } = interfaceUser;
console.log("Interface User:", interfaceUserName, interfaceUserAge, interfaceCountry);
//    6. PRACTICE EXAMPLES
const colors = ["red", "green", "blue"];
const [red, , blueq] = colors;
console.log("Colors:", red, blueq);
const product = { id: 101, price: 500 };
const { price: productPrice } = product;
console.log("Price:", productPrice);
const company = {
    name: "TCS",
    location: {
        country: "India",
        state: "Karnataka"
    }
};
const { location: { state } } = company;
console.log("State:", state);
const user_profile = { name: "Kusuma", age: 21, city: "BLR" };
const { name: u_name, city: userCity } = user_profile;
console.log(u_name);
console.log(userCity);
//# sourceMappingURL=destructuring.js.map
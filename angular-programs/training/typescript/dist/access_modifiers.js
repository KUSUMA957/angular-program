"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Public
class PublicDemo {
    name;
    constructor(name) {
        this.name = name;
    }
    greet() {
        return "Hello, " + this.name;
    }
}
const pd = new PublicDemo("Kusuma");
console.log(pd.name);
console.log(pd.greet());
//Private
class PrivateDemo {
    secret;
    constructor(secret) {
        this.secret = secret;
    }
    getInfo() {
        return "Secret is: " + this.secret;
    }
}
const pv = new PrivateDemo("TS-Only-Private");
console.log(pv.getInfo());
//Protected 
class Base {
    code;
    constructor(code) {
        this.code = code;
    }
    show() {
        return "Base code: " + this.code;
    }
}
class Child extends Base {
    getChildView() {
        return "Child sees code: " + this.code;
    }
}
const base = new Base("ABC");
const child = new Child("XYZ");
console.log(base.show());
console.log(child.getChildView());
// console.log(base.code);         
// console.log(child.code);        
class College {
    city;
    constructor(city) {
        this.city = city;
    }
}
class Student extends College {
    getCityFromCollege() {
        return this.city;
    }
}
const s = new Student("VSP");
// console.log(s.city);  
console.log(s.getCityFromCollege());

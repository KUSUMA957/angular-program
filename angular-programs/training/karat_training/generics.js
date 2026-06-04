"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
//    PART 1: BASICS OF GENERICS
/* Identity Function */
function identity(value) {
    return value;
}
console.log(identity("Hello"));
console.log(identity(100));
//console.log(identity<string>(100));
/* Multiple Generic Types */
function pair(key, value) {
    return [key, value];
}
console.log(pair("age", 30));
/* Generics with Arrays */
function getFirst(arr) {
    return arr[0];
}
console.log(getFirst([10, 20, 30]));
console.log(getFirst(["red", "green"]));
var response = {
    data: "Success",
    status: 200
};
console.log(response);
/* Generic Class */
var Box = /** @class */ (function () {
    function Box(value) {
        this.value = value;
    }
    Box.prototype.getValue = function () {
        return this.value;
    };
    return Box;
}());
var numberBox = new Box(123);
console.log(numberBox.getValue());
/* Generic Constraint */
function printLength(item) {
    return item.length;
}
console.log(printLength("hello"));
console.log(printLength([1, 2, 3]));
//console.log(printLength(true));
/* keyof with Generics */
function getProperty(obj, key) {
    return obj[key];
}
var person = { name: "Maya", age: 30 };
console.log(getProperty(person, "name"));
/* Default Generic Type */
function createArray(value) {
    return [value];
}
console.log(createArray("hello"));
console.log(createArray(99));
function createArr(value) {
    if (value === undefined) {
        return [];
    }
    return [value];
}
console.log(createArr());
console.log(createArr("hello"));
var partialUser = {
    name: "Meera"
};
console.log(partialUser);
//    PART 2: INTERVIEW CODING QUESTIONS
/* Question 1: Identity Function */
function identityFn(value) {
    return value;
}
/* Question 2: First Element */
function firstElement(arr) {
    return arr[0];
}
/* Question 3: Wrap in Array */
function wrapInArray(value) {
    return [value];
}
/* Question 4: Swap Function */
function swap(a, b) {
    return [b, a];
}
console.log(swap("hello", 10));
var apiResult = {
    data: 200,
    success: true
};
console.log(apiResult);
/* Question 6: Length Constraint */
function getLength(item) {
    return item.length;
}
/* Question 7: Key Extractor */
function extractKey(obj, key) {
    return obj[key];
}
/* Question 8: Generic Stack */
var Stack = /** @class */ (function () {
    function Stack() {
        this.items = [];
    }
    Stack.prototype.push = function (item) {
        this.items.push(item);
    };
    Stack.prototype.pop = function () {
        return this.items.pop();
    };
    Stack.prototype.peek = function () {
        return this.items[this.items.length - 1];
    };
    return Stack;
}());
var stack = new Stack();
stack.push(10);
stack.push(20);
console.log(stack.peek());
console.log(stack.pop());
/* ====================================================
   ADVANCED LEVEL
==================================================== */
/* Question 9: Merge Objects */
function mergeObjects(obj1, obj2) {
    return __assign(__assign({}, obj1), obj2);
}
console.log(mergeObjects({ name: "Maya" }, { age: 30 }));
/* Question 10: Generic Filter */
function genericFilter(arr, predicate) {
    return arr.filter(predicate);
}
console.log(genericFilter([1, 2, 3, 4], function (n) { return n % 2 === 0; }));
/* Question 11: Repository Pattern */
var Repository = /** @class */ (function () {
    function Repository() {
        this.items = [];
    }
    Repository.prototype.add = function (item) {
        this.items.push(item);
    };
    Repository.prototype.getAll = function () {
        return this.items;
    };
    Repository.prototype.getById = function (id) {
        return this.items.find(function (item) { return item.id === id; });
    };
    return Repository;
}());
var userRepo = new Repository();
userRepo.add({ id: 1, name: "Maya", age: 30 });
console.log(userRepo.getAll());
/* ====================================================
   REAL INTERVIEW SCENARIOS
==================================================== */
/* Question 13: API Handler */
function fetchData() {
    return Promise.resolve({});
}
/* Question 14: Form Model */
var Form = /** @class */ (function () {
    function Form(values) {
        this.values = values;
    }
    Form.prototype.getValues = function () {
        return this.values;
    };
    return Form;
}());
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this.events = {};
    }
    EventEmitter.prototype.on = function (event, handler) {
        this.events[event] = handler;
    };
    EventEmitter.prototype.emit = function (event, data) {
        var _a, _b;
        (_b = (_a = this.events)[event]) === null || _b === void 0 ? void 0 : _b.call(_a, data);
    };
    return EventEmitter;
}());

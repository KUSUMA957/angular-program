export {}; 
//    PART 1: BASICS OF GENERICS

/* Identity Function */
function identity<T>(value: T): T {
  return value;
}
console.log(identity<string>("Hello"));
console.log(identity<number>(100));
//console.log(identity<string>(100));

/* Multiple Generic Types */
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}
console.log(pair<string, number>("age", 30));

/* Generics with Arrays */
function getFirst<T>(arr: T[]): T | undefined{
  return arr[0];
}
console.log(getFirst<number>([10, 20, 30]));
console.log(getFirst<string>(["red", "green"]));

/* Generic Interface */
interface ApiResponse<T> {
  data: T;
  status: number;
}
const response: ApiResponse<string> = {
  data: "Success",
  status: 200
};
console.log(response);

/* Generic Class */
class Box<T> {
  constructor(public value: T) {}
  getValue(): T {
    return this.value;
  }
}
const numberBox = new Box<number>(123);
console.log(numberBox.getValue());

/* Generic Constraint */
function printLength<T extends { length: number }>(item: T): number {
  return item.length;
}
console.log(printLength("hello"));
console.log(printLength([1, 2, 3]));
//console.log(printLength(true));

/* keyof with Generics */
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
const person = { name: "Maya", age: 30 };
console.log(getProperty(person, "name"));

/* Default Generic Type */
function createArray<T = string>(value: T): T[] {
  return [value];
}
console.log(createArray("hello"));
console.log(createArray<number>(99));
function createArr<T = string>(value?: T): T[] {
  if (value === undefined) {
    return [];
  }
  return [value];
}
console.log(createArr());
console.log(createArr("hello"));


/* Utility Types */
interface User {
  name: string;
  age: number;
}
const partialUser: Partial<User> = {
  name: "Meera"
};
console.log(partialUser);


//    PART 2: INTERVIEW CODING QUESTIONS
/* Question 1: Identity Function */
function identityFn<T>(value: T): T {
  return value;
}
/* Question 2: First Element */
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}
/* Question 3: Wrap in Array */
function wrapInArray<T>(value: T): T[] {
  return [value];
}
/* Question 4: Swap Function */
function swap<A, B>(a: A, b: B): [B, A] {
  return [b, a];
}
console.log(swap("hello", 10));

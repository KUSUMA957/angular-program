type withId = {id:number};
type withName = {name :string};
 
type User = withId & withName; //must have both id and name
 
const u:User ={id:101,name:"Kavya"};
console.log(u)
 
 
type Status = "success " | "failed" | "pending";
 
let s :Status = "pending";
    //s="draft"//
 
 
type Port = 8080 | 9090 | 7070;
const startServer =(port:Port ) => console.log(`start on ${port}`);
startServer(9090);
 
 
//void returns nothing
const logMessage = (message:string):void => {
    console.log(message);
}  
 
logMessage("Hello, TypeScript!");
 
 
// //never return at all, used for functions that throw errors or have infinite loops
// const throwError = (message:string):never => {
//     throw new Error(message);
// }
 
// throwError("This is an error!");
 
 
function greet(name:string):string{
 
        return `Hello, ${name} Team!`;
}
 
let msg = greet("Kavya");
 
 
 
type Predicate<T> = (value :T) =>Boolean;
 
const isEven:Predicate<number> = (n)=>n%2==0;
 
console.log(isEven(10)); //true
console.log(isEven(11)); //false
 
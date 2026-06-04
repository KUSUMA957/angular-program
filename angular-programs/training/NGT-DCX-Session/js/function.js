function add(a, b){
    return a + b;
}
console.log(add(7, 3)); // normla function

const person ={
    name: "charishma",
    greet:function (){
      console.log("Hello, " + this.name);
    }
};
// person.greet();// old syntax
// const car = {// we use const bcz the whole object cant be replaced but the car can be replaced by car.brand = "ramay"
//     Brand: "swift",// const ensures variable names always point to same object 
//     start() {
//       console.log(this.Brand + " is starting...");
//     }
//   };
  
  //car.start(); //new syntac
//if we use let for objects then the whole objecst gt reassigned if we have paln to do taht we can use let 
// function greeting(name){
//     return "Hello"+name+"!";

// }
// console.log(greeting("Charishma"));
// function name(firstname="charishma",lastname ="ramya"){
//     return firstname+lastname;
// }
// console.log(name());
// var add=(a,b)=>{
//     return a+b;
// }
// console.log(add(2,3))
// const multiply = (a, b) => a * b;
// console.log(multiply(2,5))
//callback 
//used for event handling an d asychronous operations, timer and promises ;
//a call back is a function passed as an argument to another function.

// function processUser(name,callback){
//     console.log("processing the user:",name);
//     callback();
// }
// function done(){
//     console.log("Processing complete");
// }
// processUser("Charishma ",done)
// here the callback fuction is done 
//iife immediately invoked function expressin
//used to create a private scope and avois polluting global name space
(function(){
    console.log("This is an iife");
})();
// with parameters 
((name)=>{
    console.log("Hello"+name+"iife");
})("Charishma");

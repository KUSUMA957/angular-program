//var keyword 
//var is function-scoped 
//var variales can be redeclared and updated with in its scope 
var name = "charishma";
var name = "ramya "// redeclared the name
console.log(name);
function test(){
    var x = 10;
    if(true){
        var x = 30;
        console.log("inside if block"+x);
    }
}

test();
//console.log("outside if block"+x);// here we cannot acess x outside the function
var p =100;//function scoped
function t(){
    var p=200;
    console.log("insie"+p);

}
t();
console.log("outside"+p);
function test2(){
    if(true){
        var z=300;
    }
    console.log("value"+z);
}
test2();
//blockk scoped
if(true){
    var t=200;
    console.log("inside"+t);

}
console.log("outside"+t);
//let 
if(true){
    let l = 100;
    console.log("inside"+l);
}
//console.log("outside "+l)// cannot acess outside block 
//let is block scoped 
//updated the values using let
let count =1;
count =2;
console.log("count"+count);
// let is block scoped here the let is inside the function blockk
function test1(){
    let g=10;
    console.log("inside"+g);
}
test1();
function test2(){
    if(true){
    let k=10;
    console.log("inside"+k);
}
   // console.log("outside"+k);

}
test2();
//const keyword 
// it is block scoped and canot be reassigned
const city = "hyderabad";
// if we try to reassign the city value it shows error
if(true){
    const city ="Bangalore";
    console.log("inside"+city);
}
console.log("oiutside"+city);
// here the city is diff in inside and outside the block
function test4(){
    const o=10;
    console.log("inside"+o);

}
test4();
// here o cannot be acceses outside the block


//Arrow functions 
const square =x=>{
    return "explicit"+x*x// explicit return
};
console.log(square(4));
const squar1=x=>x*x;//implicit return
console.log(squar1(4));




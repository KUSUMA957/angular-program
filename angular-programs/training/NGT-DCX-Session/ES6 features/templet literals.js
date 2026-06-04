// string interpolation
//multiline strinfgs
//embedding the expression
let name = "charishma";
let mesage = `hello,${name} welcome to js`;
console.log(mesage);
let firstname = "charishma";
let lastname = "ramya";
let fullname = `${firstname} ${lastname}`;
console.log("full name"+fullname);
let a= 10;
let b=200;
console.log(`sum is${a+b}`);
var test = " hello \n welcome to js";
console.log(test);
var text = `hello 
welcome `
console.log(text);

let username ="charishma";
let html =`
<div class="user-card">
     <h2>${username}<h2>`
console.log(html);

function names(first,last){
    return `${first.toUpperCase()} ${last.toUpperCase()}`;
}
let greetings = `hello ${names("cherry","ramya")}`;
console.log(greetings);
//spread operator 
//expand the elements(unpacks) elements of iterables (arrays,objects and string,function arguments ) in to individual values...
//copying arrya//merging arrays
//copying object s
//merging objects
//converting string to rrays

let arr1 =[1,2,3];
let arr2=[...arr1,4];//copying arrat
console.log(arr2);
let arr3=[1,2,3];
let arr4=[6,7,8];
console.log(...arr3,...arr4)
//add elemenst 
let num =[2,3];
let newnum = [1,...num,4];
console.log(newnum);
//spread in objects 
let person ={name :"charishma",age:21};
let copyPerson={...person};

let person1 ={name:"charishma",age:21};
let personDetails = {city:"Hyderabaf",Addres:"vanasthalipyram"};
let result ={...person1,...personDetails};
console.log(result);
// conveert string to array 
let word ="Hi hello";
console.log([...word]);
//Rest operator 
// collects multile values in a singl evariable or  an array 
// spread expands the values 
// rest colects the va;lues 
function sum(...number){
    console.log(number);
}
sum(2,5,7);
function displayInfo(name1,...marks){
    console.log("name"+name1);
    console.log("marks"+marks);

}
displayInfo("charishma",78,21,33);
//object destructring allows extract properties ffrom the object  and assign to variables 
const user ={id :101,name2:"cherry"};
//destructuring 
const {id,name2} =user;
console.log(id,name2);
console.log(user);

//rename the variables 
const{name2:fullName}=user;
console.log(fullName);//rename the variable name 
//default values 
let user2 ={name3:"charishma"};
let {name3,age1=30} = user2;
console.log(name3);
console.log(age1);

let personTwo ={
    name:"charisham",
    address:{
        city:"Benguluru",
        pincode:87899
    }
};
console.log(personTwo.address.city);
//update city value 
personTwo.address.city="hyderabad";
console.log(personTwo.address.city);
//destructured
let {address,pincode} =personTwo;
console.log(address.city);
console.log(address.pincode);
//rest with destructuring 
let person3 = {
    name:"cherry",
    age4:30,
    city:"hyderabad"
};
let{...pDetails} =person3;
console.log(pDetails);
function user5({ name6, ...details }) {
    console.log("Name:", name6);
    console.log("Details:", details);
  }
user5({ name6: "cherry", age4: 30, city: "hyderabad" });
 
let number =[1,2,3];
for(let value of number){
    console.log(value);
}
let number1 =[1,2,3];
for(let index in number1){
    console.log(index);
}
let num6=[5,7,8];
for(let index in num6){
    console.log(num6[index]);
}
let person4 = {
    name7:"cherry",
    age9:30,
    city3:"hyderabad"
};
for (let key in  person4){
    console.log(key,person4[key]);
}

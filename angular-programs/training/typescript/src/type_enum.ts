let x:number=100;
 
let name:string="Rashmi";
 
// compilitation flow
 
// Typescript(.ts)---->Typescript Compiler(tsc)--->JavaScript(.js)---Browser/Node.js runtime
 
 
// Data types:
// Number:
let age:number = 42;
let salary:number=12345
 
console.log(age);
console.log(salary);
 
let firstName:string = "Kavya";
console.log(firstName);
 
 
let city:string= "Bangalurur"
let message:string = `Wel come to ${city}`;
console.log(message);
 
 
Boolean
let isActive :Boolean = true;
console.log(isActive);
 
 
let marks :number = 75;
let isPassed:boolean = marks> 40;
 
console.log("Passes:",isPassed);
 
//1.Number Array:
let numbers:number[] = [1,2,3,4,5,6]
console.log(numbers);
 
 
//2.String arrays:
	let names:string[] = ["Kavya","Preethi","Himaja"]
 
	for(let name of names){
		console.log(name);
	}
 
//Tuples:[string,number]
 
let user:[string,number] = ["Kavys",30]
console.log(user[0]);
console.log(user[1]);
 
let readOnlyTuples :readonly[string,number]= ["key",100]
 
 
enum role{
	Admin,
	User,
	Guest
}
let myRole:role = role.Admin;
console.log(myRole);
 
enum weeks{ Sunday,monday,tuesday,wednesday,} 	
 
enum Status{
	Pending=1,
	Approved=2,
	Rejected=3
}	
 
 
let data:any=10;
data="Hello";
data = true;
 
function printValue(value:any){
 
console.log(value);
 
}
 
printValue(100);
printValue("Capgemini");
 
// unknown 
// -------
 
let value:unknown = "Hello";
 
if(typeof value ==="string")
	console.log(value.toUpperCase());
 
let input:unknown = 50;
 
	if(typeof input === "number")
	console.log(input+10);
 
 
function processInput(input:unknown) : string{
 
	if(typeof input === "string"){
		return input.toUpperCase();
	}
	if(typeof input === 'number'){
		return `Number: ${input}`;
	}
	return 'Unknown type';
}
 
console.log(processInput("Hello"));
console.log(processInput(123));
 
function display():void{
//return "Hello Himaja";
}

function displayName():string{
return "Hello Himaja";
}
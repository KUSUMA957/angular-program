// Union Type and intersection type:
// ---------------------------------
 
// type--> A type defines what kind of values a variable can store
// 	and what operations are allowed on it.
 
// 	tells to type script:
// 	What data is allowed
// 	What methods can be used
// 	what is not allowed
 
	let age : number = 30;
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
 
let id:string|number;
id=101;
id="Shiva"
//id=true
 
 
// id can be string or number
// cannot be Boolean
 
type LoginResult = string | Boolean;
 
function login(username:string):LoginResult{
 
if(username === "admin"){
	return true;
}else{
	return "Invalid user";
}
 
}
 
let result = login("admin");
 
if(typeof result ==='boolean'){
	console.log("Login Success")
}else
	console.log(result)
 
 
type withId = {id:number};
type withName = {name :string};
 
type User = withId & withName; //must have both id and name
 
const u:User ={id:101,name:"Kavya"};
console.log(u)
 
 
 
//value: unknowninput: unknowndata: anyvalue: anynames: stringinput: unknownstring, number
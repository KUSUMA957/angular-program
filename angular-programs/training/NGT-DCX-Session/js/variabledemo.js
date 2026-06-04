var name = "Charishma";
var age = 21;
var isActive = true;
var city="Hyderabad";
var user ={id:1,name:"charishma",age:30};
var numbers=[1,2,3,4,5];
console.log("Nmae"+name);
console.log("age"+age);
console.log("isActive"+isActive);
console.log("city"+city);
var x=100;
x=-20.12;
console.log("value of x"+x);
//Basic operation
var firstname="charishma";
var lastname = "ramya";
var a=10;
var b=11;
console.log(a+b);
console.log(firstname+lastname);
var score=89;
if(score>90){
    console.log("grade A");

}else if(score>70 && score<90){
    console.log("Grade B");
}
else{
    console.log("Grade C");
}
 var day = "Monday";
 switch(day) {
    case "Monday":
        console.log("Monday");
        break;
   case "Tuesday":
        console.log("Tuesday");
        break; 
    default :
         console.log("Invalid");
 } 
 var count =0;
 while(count<5){
    console.log("Count"+count);
    count++;
 }
 //creating array in javascript 
 var array1=[1,2,3,45];
 var aray2=["apple","banaana"];
 var array3 = new Array(1,"Hello");
 array1[100]=200;
 console.log("array1"+array1.length);
 var nums = [10,100,20,30];
 nums.push(90);
 console.log("nums"+nums);
 nums.pop();
 console.log(nums);
 nums.unshift(5);
 console.log("nums"+nums);
 nums.shift()// remove 1st element from arraty
 console.log("nums"+nums);
var nums1 =[10,20,30,40];
console.log(nums.concat(nums1));
console.log(nums.slice(2,4));// returns new array elements from 1st to last index
var fruits =["apple","banaana"];
nums.forEach(function(num){
    console.log("Number"+num);
})
nums.forEach((num)=>{
    console.log("number"+num)
});
nums.forEach((n,i)=>{
    console.log("index:"+i+"number"+n);
});
var nums2 = [10,20,30,40,50,50];
var numAbove20=nums2.filter(n=>n>20);
console.log(numAbove20);
var user =[
    {id:1,name:"charishma",age:20}
    
]
var r = user.filter(u => u.age > 28);
console.log(r);
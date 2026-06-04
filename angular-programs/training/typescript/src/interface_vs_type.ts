//best for ood
//best for react applications
//easy to extend
//types can describe any kind of type not just ojects
//priitives
//unions
//intersections
//tuples
interface one{
    id:number;
}
interface one{
    name:string;
}
//by using interface w ecan merge
let c:one={id:1,name:"Kusuma"};
console.log(c);
type user5 = {id:number};
// type user5={name:string};//invalid
interface one {
    id: number;
}
interface oneEx extends one {
    name: string;
}
let u1: oneEx = { id: 101, name: "kussu" };
console.log(u1);
type User2 = { id: number };
type userOne = User2 & { name: string };
let u2: userOne = { id: 101, name: "kussu" };
console.log(u2);
 
//type alias
type Use={id:number};
type UserOne=Use&{name:string};
 
 
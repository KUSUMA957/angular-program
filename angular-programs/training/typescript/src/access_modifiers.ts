//Public
class PublicDemo {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  public greet() {                 
    return "Hello, " + this.name;
  }
}
const pd = new PublicDemo("Kusuma");
console.log(pd.name);              
console.log(pd.greet());         

//Private
class PrivateDemo {
  private secret: string; 
  constructor(secret: string) {
    this.secret = secret;
  }
  getInfo() {
    return "Secret is: " + this.secret;
  }
}
const pv = new PrivateDemo("TS-Only-Private");
console.log(pv.getInfo()); 

//Protected 
class Base {
  protected code: string; 
  constructor(code: string) {
    this.code = code;
  }
  show() {
    return "Base code: " + this.code;
  }
}

class Child extends Base {
  getChildView() {
    return "Child sees code: " + this.code;   
  }
}
const base = new Base("ABC");
const child = new Child("XYZ");
console.log(base.show());          
console.log(child.getChildView()); 
// console.log(base.code);         
// console.log(child.code);        



class College {
  protected city: string;
  constructor(city: string) {
    this.city = city;
  }
}
class Student extends College {
  getCityFromCollege() {
    return this.city;   
  }
}

const s = new Student("VSP");
// console.log(s.city);  
console.log(s.getCityFromCollege()); 
class Person{
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    hello(){
        console.log(`Hello,my name is ${this.name}`);
    }
}
const p1 = new Person("Charishma", 23);
p1.hello();
//inheritence
class Student extends Person {
    constructor(name, age, grade) {
        super(name, age);
        this.grade = grade;
    }
    Grade() {
        console.log(`${this.name} 's grade ${this.grade}`);
    }
}

const s1 = new Student("Cherry", 22, "A");
s1.hello();
s1.Grade();
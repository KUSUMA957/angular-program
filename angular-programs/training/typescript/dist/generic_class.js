"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Devices {
    value;
    constructor(value) {
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    setValue(newValue) {
        this.value = newValue;
    }
}
const numberOfDevices = new Devices(10);
console.log(numberOfDevices.getValue());
const DeviceName = new Devices("Laptop");
console.log(DeviceName.getValue());
class Repository {
    items = [];
    add(item) {
        this.items.push(item);
    }
    getAll() {
        return this.items;
    }
}
class Student {
    name;
    grade;
    constructor(name, grade) {
        this.name = name;
        this.grade = grade;
    }
}
class Teacher {
    name;
    subject;
    constructor(name, subject) {
        this.name = name;
        this.subject = subject;
    }
}
const studentRepo = new Repository();
const teacherRepo = new Repository();
studentRepo.add(new Student("Kusuma", 8));
studentRepo.add(new Student("Teja", 9));
teacherRepo.add(new Teacher("Manish", "SpringBoot"));
teacherRepo.add(new Teacher("Shiva", "Angular"));
console.log("Students:", studentRepo.getAll());
console.log("Teachers:", teacherRepo.getAll());

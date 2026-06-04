"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Person {
    id; // accessible in child classes
    firstName = "";
    lastName = "";
    constructor(id, firstName, lastName) {
        this.id = id;
        this.setFirstName(firstName);
        this.setLastName(lastName);
    }
    setFirstName(value) {
        if (!value || value.length < 2) {
            throw new Error("First name too short");
        }
        this.firstName = value;
    }
    setLastName(value) {
        if (!value || value.length < 1) {
            throw new Error("Last name too short");
        }
        this.lastName = value;
    }
    getFullName() {
        return this.firstName + " " + this.lastName;
    }
}
class Teacher extends Person {
    subject = "";
    static teacherCount = 0;
    constructor(id, firstName, lastName, subject) {
        super(id, firstName, lastName);
        this.setSubject(subject);
        Teacher.teacherCount++;
    }
    setSubject(value) {
        if (!value || value.length < 2) {
            throw new Error("Subject too short");
        }
        this.subject = value;
    }
    getSummary() {
        // polymorphism (override)
        return `Teacher ${this.getFullName()} | Subject: ${this.subject}`;
    }
}
class Student extends Person {
    grade = 1;
    static studentCount = 0;
    constructor(id, firstName, lastName, grade) {
        super(id, firstName, lastName);
        this.setGrade(grade);
        Student.studentCount++;
    }
    setGrade(value) {
        if (value < 1 || value > 10) {
            throw new Error("Grade must be between 1 and 10");
        }
        this.grade = value;
    }
    improveGrade() {
        if (this.grade < 10) {
            this.grade++;
        }
    }
    getSummary() {
        // polymorphism (override)
        return `Student ${this.getFullName()} | Grade: ${this.grade}`;
    }
}
const t1 = new Teacher(1, "Shiva", "K.H", "Angular");
const t2 = new Teacher(2, "Manish", "G", "SpringBoot");
const s1 = new Student(101, "Kusuma", "Mogadala", 7);
const s2 = new Student(102, "Teja", "Mogadala", 9);
const s3 = new Student(103, "Maha", "M", 9);
s1.improveGrade();
console.log(s3.getSummary());
s3.improveGrade();
console.log(s3.getSummary());
const people = [t1, t2, s1, s2];
for (const p of people) {
    console.log(p.getSummary());
}
console.log("Total Number Of Teachers:", Teacher.teacherCount);
console.log("Total Number Of Students:", Student.studentCount);

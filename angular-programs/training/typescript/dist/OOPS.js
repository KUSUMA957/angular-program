"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class College {
    #name = "";
    #city = "";
    constructor(name, city) {
        this.setName(name);
        this.setCity(city);
    }
    setName(value) {
        if (!value || value.trim().length < 2) {
            throw new Error("College name must be at least 2 characters");
        }
        this.#name = value.trim();
    }
    getName() {
        return this.#name;
    }
    setCity(value) {
        if (!value || !value.trim()) {
            throw new Error("City is required");
        }
        this.#city = value.trim();
    }
    getCity() {
        return this.#city;
    }
    getSummary() {
        return `College: ${this.getName()} (${this.getCity()})`;
    }
}
class Student extends College {
    #firstName = "";
    #lastName = "";
    #grade = 0;
    static totalStudents = 0;
    constructor(firstName, lastName, grade, collegeName, collegeCity) {
        super(collegeName, collegeCity);
        this.setFirstName(firstName);
        this.setLastName(lastName);
        this.setGrade(grade);
        Student.totalStudents++;
    }
    setFirstName(value) {
        if (!value || value.trim().length < 2) {
            throw new Error("First name is too short");
        }
        this.#firstName = value.trim();
    }
    setLastName(value) {
        if (!value || value.trim().length < 2) {
            throw new Error("Last name is too short");
        }
        this.#lastName = value.trim();
    }
    setGrade(value) {
        if (!Number.isFinite(value) || value < 1 || value > 10) {
            throw new Error("Grade must be a number between 1 and 10");
        }
        this.#grade = Math.floor(value);
    }
    getFullName() {
        return this.#firstName + " " + this.#lastName;
    }
    improveGrade() {
        if (this.#grade < 10)
            this.#grade += 1;
    }
    getSummary() {
        return `Student: ${this.getFullName()} | Grade: ${this.#grade} | College: ${this.getName()} (${this.getCity()})`;
    }
    static printStudentCount() {
        console.log("Total Students:", Student.totalStudents);
    }
}
const s1 = new Student("Kusuma", "Mogadala", 7, "GVP College Of Engineering", "VSP");
const s2 = new Student("Teja", "Mogadala", 9, "ANITS College", "VSP");
//const s3 = new Student("", "K", 4, "MVGR", "VZM");
s1.improveGrade();
Student.printStudentCount;
console.log(s1.getSummary());
console.log(s2.getSummary());

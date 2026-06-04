// TypeScript starts with a broad type, and then based on some check (if, typeof, instanceof, etc.),
// it narrows the variable to a more specific type inside that block.
//Narrowing union with typeof
function print(value: string | number): void {
  if (typeof value === "string") {
    console.log("Length of the string:", value.length);
  } else {
    console.log("Multiply by 2:", value * 2);
  }
}
print("Kusuma");
print(21);

//Truthiness narrowing
function greet(name?: string): void {
  if (name) {
    console.log("Hello,", name.trim());
  } else {
    console.log("Hello, Guest");
  }
}
greet(" Kusuma ");
greet();

//Literal narrowing (string literal unions)
function handleStatus(status: "idle" | "loading" | "done"): void {
  if (status === "loading") {
    console.log("Please wait...");
  } else if (status === "done") {
    console.log("Finished!");
  } else {
    console.log("Idle.");
  }
}
handleStatus("loading");

//Narrowing using in with object shapes
type College = { name: string; city: string };
type Student = { firstName: string; lastName: string; grade: number };
function printEntity(e: College | Student): void {
  if ("name" in e) {
    console.log(`College: ${e.name} (${e.city})`);
  } else {
    console.log(`Student: ${e.firstName} ${e.lastName} | Grade: ${e.grade}`);
  }
}
printEntity({ name: "GVP", city: "VSP" });
printEntity({ firstName: "Kusuma", lastName: "M", grade: 8 });

//Narrowing with instanceof
class Student1 {
  constructor(public name: string) {}
}
class Teacher {
  constructor(public name: string) {}
}
function display(person: Student1 | Teacher) {
  if (person instanceof Student1) {
    console.log("Student:", person.name);
  } else {
    console.log("Teacher:", person.name);
  }
}



//TypeNarrowing With Intersection Types

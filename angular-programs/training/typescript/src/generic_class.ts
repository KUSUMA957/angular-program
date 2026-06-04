class Devices<T> {
  private value: T;
  constructor(value: T) {
    this.value = value;
  }
  getValue(): T {
    return this.value;
  }
  setValue(newValue: T) {
    this.value = newValue;
  }
}
const numberOfDevices = new Devices<number>(10);
console.log(numberOfDevices.getValue()); 
const DeviceName = new Devices<string>("Laptop");
console.log(DeviceName.getValue());


class Repository<T> {
  private items: T[] = [];
  add(item: T) {
    this.items.push(item);
  }
  getAll(): T[] {
    return this.items;
  }
}
class Student {
  constructor(public name: string, public grade: number) {}
}
class Teacher {
  constructor(public name: string, public subject: string) {}
}
const studentRepo = new Repository<Student>();
const teacherRepo = new Repository<Teacher>();
studentRepo.add(new Student("Kusuma", 8));
studentRepo.add(new Student("Teja", 9));
teacherRepo.add(new Teacher("Manish", "SpringBoot"));
teacherRepo.add(new Teacher("Shiva", "Angular"));
console.log("Students:", studentRepo.getAll());
console.log("Teachers:", teacherRepo.getAll());
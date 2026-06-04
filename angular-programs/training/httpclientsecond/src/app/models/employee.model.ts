export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  department: string;
  salary: number;
}

export interface CreateEmployeeRequest {
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  department: string;
  salary: number;
}

export interface UpdateEmployeeRequest extends CreateEmployeeRequest {
  id: number;
}

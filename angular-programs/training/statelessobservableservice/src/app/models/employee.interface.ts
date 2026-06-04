export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  startDate: string;
}

export interface CreateEmployeeRequest {
  name: string;
  email: string;
  department: string;
  position: string;
  salary: number;
}

export interface UpdateEmployeeRequest extends Partial<CreateEmployeeRequest> {
  id: number;
}

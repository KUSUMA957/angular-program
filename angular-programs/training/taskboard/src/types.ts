/** ========= Type Aliases ========= */
export type ID = string;
export type ISODate = string;           // e.g., "2026-03-03T10:00:00.000Z"
export type Points = number;

export type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

/** ========= Domain Enums/Unions ========= */
export type Status = "BACKLOG" | "IN_PROGRESS" | "REVIEW" | "DONE";

/** ========= Domain Interfaces ========= */
export interface User {
  id: ID;
  name: string;
}

export interface Label {
  id: ID;
  name: string; // We’ll use this for label indexing
}

export interface Task {
  id: ID;
  title: string;
  description?: string;
  status: Status;
  assigneeId?: ID;
  points: Points;
  labels: Label[];

  createdAt: ISODate;
  updatedAt: ISODate;
  startedAt?: ISODate;    // when it entered IN_PROGRESS
  completedAt?: ISODate;  // when it entered DONE
  dueDate?: ISODate;      // optional, used for queries
}

export interface Sprint {
  id: ID;
  name: string;
  startDate: ISODate;
  endDate: ISODate;
  taskIds: ID[];
}

/** ========= Utility Types ========= */
export type CreateTask = Omit<Task, "id" | "createdAt" | "updatedAt">;
export type UpdateTask = Partial<Omit<Task, "id" | "createdAt">>;

/** ========= Query Types ========= */
export interface SearchQuery {
  text?: string;        // matches title/description
  assigneeId?: ID;
  status?: Status;
  label?: string;       // by label name
}
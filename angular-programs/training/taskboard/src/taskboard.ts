// import {
//   CreateTask,
//   ID,
//   ISODate,
//   Label,
//   Result,
//   SearchQuery,
//   Status,
//   Task,
//   UpdateTask
// } from "./types";
// import { generateId, nowISO, uniqueLabels } from "./utils";

// const FORWARD_ORDER: Status[] = ["BACKLOG", "IN_PROGRESS", "REVIEW", "DONE"];
// const WIP_STATUSES: Status[] = ["IN_PROGRESS", "REVIEW"];

// function canTransition(from: Status, to: Status): boolean {
//   // Business rule: must follow step-by-step forward transitions (no skipping),
//   // and disallow BACKLOG -> DONE directly.
//   const fromIdx = FORWARD_ORDER.indexOf(from);
//   const toIdx = FORWARD_ORDER.indexOf(to);
//   return toIdx === fromIdx || toIdx === fromIdx + 1; // allow no-op or next step
// }

// export class TaskBoard {
//   private readonly tasksById: Map<ID, Task>;
//   private readonly indexByAssignee: Map<ID, Set<ID>>;
//   private readonly indexByLabel: Map<string, Set<ID>>;

//   private constructor(
//     tasksById: Map<ID, Task>,
//     indexByAssignee: Map<ID, Set<ID>>,
//     indexByLabel: Map<string, Set<ID>>
//   ) {
//     this.tasksById = tasksById;
//     this.indexByAssignee = indexByAssignee;
//     this.indexByLabel = indexByLabel;
//   }

//   /** Create an empty board. */
//   static empty(): TaskBoard {
//     return new TaskBoard(new Map(), new Map(), new Map());
//   }

//   /** Clone helpers (immutable-state pattern). */
//   private cloneMaps(): {
//     tasksById: Map<ID, Task>;
//     indexByAssignee: Map<ID, Set<ID>>;
//     indexByLabel: Map<string, Set<ID>>;
//   } {
//     // shallow clone maps; we'll also clone sets we touch
//     return {
//       tasksById: new Map(this.tasksById),
//       indexByAssignee: new Map(this.indexByAssignee),
//       indexByLabel: new Map(this.indexByLabel)
//     };
//   }

//   /** Read-only snapshot of all tasks (as fresh array). */
//   listTasks(): Task[] {
//     return Array.from(this.tasksById.values());
//   }

//   /** Read a single task by ID (no mutation). */
//   getTask(id: ID): Task | undefined {
//     const t = this.tasksById.get(id);
//     return t ? { ...t } : undefined; // return a safe copy
//   }

//   /** Example to show usage of Array.find (requirement). */
//   findTaskInSnapshotById(id: ID): Task | undefined {
//     return this.listTasks().find(t => t.id === id);
//   }

//   /** Index maintenance helpers (clone-on-write). */
//   private addToAssigneeIndex(index: Map<ID, Set<ID>>, assigneeId: ID, taskId: ID): void {
//     const set = new Set(index.get(assigneeId) ?? []);
//     set.add(taskId);
//     index.set(assigneeId, set);
//   }

//   private removeFromAssigneeIndex(index: Map<ID, Set<ID>>, assigneeId: ID, taskId: ID): void {
//     const set = new Set(index.get(assigneeId) ?? []);
//     set.delete(taskId);
//     if (set.size === 0) index.delete(assigneeId);
//     else index.set(assigneeId, set);
//   }

//   private addToLabelIndex(index: Map<string, Set<ID>>, labelName: string, taskId: ID): void {
//     const key = labelName.trim().toLowerCase();
//     const set = new Set(index.get(key) ?? []);
//     set.add(taskId);
//     index.set(key, set);
//   }

//   private removeFromLabelIndex(index: Map<string, Set<ID>>, labelName: string, taskId: ID): void {
//     const key = labelName.trim().toLowerCase();
//     const set = new Set(index.get(key) ?? []);
//     set.delete(taskId);
//     if (set.size === 0) index.delete(key);
//     else index.set(key, set);
//   }

//   /** Create a task (auto id + timestamps). */
//   createTask(input: CreateTask): Result<{ board: TaskBoard; task: Task }> {
//     const id = generateId("task");
//     const createdAt = nowISO();
//     const updatedAt = createdAt;

//     const labels: Label[] = uniqueLabels(input.labels ?? []);

//     const task: Task = {
//       ...input,
//       id,
//       labels,
//       createdAt,
//       updatedAt
//     };

//     const { tasksById, indexByAssignee, indexByLabel } = this.cloneMaps();

//     tasksById.set(id, task);

//     if (task.assigneeId) {
//       this.addToAssigneeIndex(indexByAssignee, task.assigneeId, id);
//     }
//     for (const l of task.labels) {
//       this.addToLabelIndex(indexByLabel, l.name, id);
//     }

//     return { ok: true, value: { board: new TaskBoard(tasksById, indexByAssignee, indexByLabel), task } };
//   }

//   /** Update a task (safe partial update, immutable). */
//   updateTask(id: ID, patch: UpdateTask): Result<{ board: TaskBoard; task: Task }> {
//     const existing = this.tasksById.get(id);
//     if (!existing) return { ok: false, error: `Task ${id} not found` };

//     // Validate status transition if status is being updated
//     if (patch.status && !canTransition(existing.status, patch.status)) {
//       return { ok: false, error: `Invalid status transition: ${existing.status} → ${patch.status}` };
//     }

//     const updatedAt = nowISO();

//     // compute new task (spread for immutable merge)
//     let next: Task = { ...existing, ...patch, updatedAt };

//     // Normalize labels & maintain label index changes
//     const prevLabelNames = new Set((existing.labels || []).map(l => l.name.trim().toLowerCase()));
//     const nextLabels = uniqueLabels(next.labels || []);
//     next = { ...next, labels: nextLabels };
//     const nextLabelNames = new Set(nextLabels.map(l => l.name.trim().toLowerCase()));

//     // Lifecycle timestamps
//     if (existing.status !== next.status) {
//       if (existing.status === "BACKLOG" && next.status === "IN_PROGRESS" && !existing.startedAt) {
//         next.startedAt = updatedAt;
//       }
//       if (next.status === "DONE" && !existing.completedAt) {
//         next.completedAt = updatedAt;
//       }
//     }

//     const { tasksById, indexByAssignee, indexByLabel } = this.cloneMaps();
//     tasksById.set(id, next);

//     // Assignee index changes
//     if (existing.assigneeId !== next.assigneeId) {
//       if (existing.assigneeId) this.removeFromAssigneeIndex(indexByAssignee, existing.assigneeId, id);
//       if (next.assigneeId) this.addToAssigneeIndex(indexByAssignee, next.assigneeId, id);
//     }

//     // Label index changes
//     for (const oldName of prevLabelNames) {
//       if (!nextLabelNames.has(oldName)) this.removeFromLabelIndex(indexByLabel, oldName, id);
//     }
//     for (const newName of nextLabelNames) {
//       if (!prevLabelNames.has(newName)) this.addToLabelIndex(indexByLabel, newName, id);
//     }

//     return { ok: true, value: { board: new TaskBoard(tasksById, indexByAssignee, indexByLabel), task: next } };
//   }

//   /** Move a task along the workflow (enforces transition rule). */
//   moveTask(id: ID, to: Status): Result<{ board: TaskBoard; task: Task }> {
//     return this.updateTask(id, { status: to });
//   }

//   /** Batch move using rest params (e.g., moveTasks("REVIEW", id1, id2, id3)). */
//   moveTasks(to: Status, ...ids: ID[]): Result<{ board: TaskBoard; tasks: Task[] }> {
//     let board: TaskBoard = this;
//     const moved: Task[] = [];

//     for (const id of ids) {
//       const res = board.moveTask(id, to);
//       if (!res.ok) return { ok: false, error: `[Batch] ${res.error}` };
//       board = res.value.board;
//       moved.push(res.value.task);
//     }

//     return { ok: true, value: { board, tasks: moved } };
//   }

//   /** Add a label (by name) to many tasks. */
//   addLabelToTasks(labelName: string, ...ids: ID[]): Result<{ board: TaskBoard; tasks: Task[] }> {
//     const normalized = labelName.trim();
//     if (!normalized) return { ok: false, error: "Label name cannot be empty" };

//     const newLabel: Label = { id: generateId("label"), name: normalized };
//     let board: TaskBoard = this;
//     const updated: Task[] = [];

//     for (const id of ids) {
//       const t = board.getTask(id);
//       if (!t) return { ok: false, error: `Task ${id} not found` };
//       const labels = uniqueLabels([...(t.labels || []), newLabel]);
//       const res = board.updateTask(id, { labels });
//       if (!res.ok) return { ok: false, error: `[Batch] ${res.error}` };
//       board = res.value.board;
//       updated.push(res.value.task);
//     }

//     return { ok: true, value: { board, tasks: updated } };
//     }

//   /** Remove a label (by name) from many tasks. */
//   removeLabelFromTasks(labelName: string, ...ids: ID[]): Result<{ board: TaskBoard; tasks: Task[] }> {
//     const key = labelName.trim().toLowerCase();
//     let board: TaskBoard = this;
//     const updated: Task[] = [];

//     for (const id of ids) {
//       const t = board.getTask(id);
//       if (!t) return { ok: false, error: `Task ${id} not found` };
//       const labels = (t.labels || []).filter(l => l.name.trim().toLowerCase() !== key);
//       const res = board.updateTask(id, { labels });
//       if (!res.ok) return { ok: false, error: `[Batch] ${res.error}` };
//       board = res.value.board;
//       updated.push(res.value.task);
//     }

//     return { ok: true, value: { board, tasks: updated } };
//   }

//   /** Search by text, assignee, status, label. */
//   search(q: SearchQuery): Task[] {
//     const text = q.text?.trim().toLowerCase();
//     const labelKey = q.label?.trim().toLowerCase();

//     // Start from all tasks, then filter (Array.filter)
//     return this.listTasks()
//       .filter(t => (q.status ? t.status === q.status : true))
//       .filter(t => (q.assigneeId ? t.assigneeId === q.assigneeId : true))
//       .filter(t =>
//         text
//           ? (t.title + " " + (t.description ?? "")).toLowerCase().includes(text)
//           : true
//       )
//       .filter(t =>
//         labelKey
//           ? (t.labels || []).some(l => l.name.trim().toLowerCase() === labelKey)
//           : true
//       );
//   }

//   /** Work-in-progress count (IN_PROGRESS + REVIEW). */
//   getWipCount(): number {
//     return this.listTasks().filter(t => WIP_STATUSES.includes(t.status)).length;
//   }

//   /** Total points grouped by status. */
//   getPointsByStatus(): Record<Status, number> {
//     const base: Record<Status, number> = {
//       BACKLOG: 0,
//       IN_PROGRESS: 0,
//       REVIEW: 0,
//       DONE: 0
//     };
//     return this.listTasks().reduce((acc, t) => {
//       acc[t.status] += t.points || 0;
//       return acc;
//     }, base);
//   }

//   /** Tasks due before a given date (ISO). */
//   getTasksDueBefore(date: ISODate): Task[] {
//     return this.listTasks().filter(t => t.dueDate && new Date(t.dueDate) < new Date(date));
//   }
// }

import {
  CreateTask,
  ID,
  ISODate,
  Label,
  Result,
  SearchQuery,
  Status,
  Task,
  UpdateTask
} from "./types";
import { generateId, nowISO, uniqueLabels } from "./utils";

const FORWARD_ORDER: Status[] = ["BACKLOG", "IN_PROGRESS", "REVIEW", "DONE"];
const WIP_STATUSES: Status[] = ["IN_PROGRESS", "REVIEW"];

function canTransition(from: Status, to: Status): boolean {
  const fromIdx = FORWARD_ORDER.indexOf(from);
  const toIdx = FORWARD_ORDER.indexOf(to);
  // allow no-op or move exactly one step forward
  return toIdx === fromIdx || toIdx === fromIdx + 1;
}

export class TaskBoard {
  private readonly tasksById: Map<ID, Task>;
  private readonly indexByAssignee: Map<ID, Set<ID>>;
  private readonly indexByLabel: Map<string, Set<ID>>;

  private constructor(
    tasksById: Map<ID, Task>,
    indexByAssignee: Map<ID, Set<ID>>,
    indexByLabel: Map<string, Set<ID>>
  ) {
    this.tasksById = tasksById;
    this.indexByAssignee = indexByAssignee;
    this.indexByLabel = indexByLabel;
  }

  static empty(): TaskBoard {
    return new TaskBoard(new Map(), new Map(), new Map());
  }

  private cloneMaps(): {
    tasksById: Map<ID, Task>;
    indexByAssignee: Map<ID, Set<ID>>;
    indexByLabel: Map<string, Set<ID>>;
  } {
    return {
      tasksById: new Map(this.tasksById),
      indexByAssignee: new Map(this.indexByAssignee),
      indexByLabel: new Map(this.indexByLabel)
    };
  }

  listTasks(): Task[] {
    return Array.from(this.tasksById.values());
  }

  getTask(id: ID): Task | undefined {
    const t = this.tasksById.get(id);
    return t ? { ...t } : undefined;
  }

  findTaskInSnapshotById(id: ID): Task | undefined {
    return this.listTasks().find(t => t.id === id);
  }

  private addToAssigneeIndex(index: Map<ID, Set<ID>>, assigneeId: ID, taskId: ID): void {
    const set = new Set(index.get(assigneeId) ?? []);
    set.add(taskId);
    index.set(assigneeId, set);
  }

  private removeFromAssigneeIndex(index: Map<ID, Set<ID>>, assigneeId: ID, taskId: ID): void {
    const set = new Set(index.get(assigneeId) ?? []);
    set.delete(taskId);
    if (set.size === 0) index.delete(assigneeId);
    else index.set(assigneeId, set);
  }

  private addToLabelIndex(index: Map<string, Set<ID>>, labelName: string, taskId: ID): void {
    const key = labelName.trim().toLowerCase();
    const set = new Set(index.get(key) ?? []);
    set.add(taskId);
    index.set(key, set);
  }

  private removeFromLabelIndex(index: Map<string, Set<ID>>, labelName: string, taskId: ID): void {
    const key = labelName.trim().toLowerCase();
    const set = new Set(index.get(key) ?? []);
    set.delete(taskId);
    if (set.size === 0) index.delete(key);
    else index.set(key, set);
  }

  createTask(input: CreateTask): Result<{ board: TaskBoard; task: Task }> {
    const id = generateId("task");
    const createdAt = nowISO();
    const updatedAt = createdAt;

    const labels: Label[] = uniqueLabels(input.labels ?? []);

    const task: Task = {
      ...input,
      id,
      labels,
      createdAt,
      updatedAt
    };

    const { tasksById, indexByAssignee, indexByLabel } = this.cloneMaps();

    tasksById.set(id, task);
    if (task.assigneeId) this.addToAssigneeIndex(indexByAssignee, task.assigneeId, id);
    for (const l of task.labels) this.addToLabelIndex(indexByLabel, l.name, id);

    return { ok: true, value: { board: new TaskBoard(tasksById, indexByAssignee, indexByLabel), task } };
  }

  updateTask(id: ID, patch: UpdateTask): Result<{ board: TaskBoard; task: Task }> {
    const existing = this.tasksById.get(id);
    if (!existing) return { ok: false, error: `Task ${id} not found` };

    if (patch.status && !canTransition(existing.status, patch.status)) {
      return { ok: false, error: `Invalid status transition: ${existing.status} → ${patch.status}` };
    }

    const updatedAt = nowISO();
    let next: Task = { ...existing, ...patch, updatedAt };

    const prevLabelNames = new Set((existing.labels || []).map(l => l.name.trim().toLowerCase()));
    const nextLabels = uniqueLabels(next.labels || []);
    next = { ...next, labels: nextLabels };
    const nextLabelNames = new Set(nextLabels.map(l => l.name.trim().toLowerCase()));

    if (existing.status !== next.status) {
      if (existing.status === "BACKLOG" && next.status === "IN_PROGRESS" && !existing.startedAt) {
        next.startedAt = updatedAt;
      }
      if (next.status === "DONE" && !existing.completedAt) {
        next.completedAt = updatedAt;
      }
    }

    const { tasksById, indexByAssignee, indexByLabel } = this.cloneMaps();
    tasksById.set(id, next);

    if (existing.assigneeId !== next.assigneeId) {
      if (existing.assigneeId) this.removeFromAssigneeIndex(indexByAssignee, existing.assigneeId, id);
      if (next.assigneeId) this.addToAssigneeIndex(indexByAssignee, next.assigneeId, id);
    }

    for (const oldName of prevLabelNames) {
      if (!nextLabelNames.has(oldName)) this.removeFromLabelIndex(indexByLabel, oldName, id);
    }
    for (const newName of nextLabelNames) {
      if (!prevLabelNames.has(newName)) this.addToLabelIndex(indexByLabel, newName, id);
    }

    return { ok: true, value: { board: new TaskBoard(tasksById, indexByAssignee, indexByLabel), task: next } };
  }

  moveTask(id: ID, to: Status): Result<{ board: TaskBoard; task: Task }> {
    return this.updateTask(id, { status: to });
  }

  moveTasks(to: Status, ...ids: ID[]): Result<{ board: TaskBoard; tasks: Task[] }> {
    let board: TaskBoard = this;
    const moved: Task[] = [];
    for (const id of ids) {
      const res = board.moveTask(id, to);
      if (!res.ok) return { ok: false, error: `[Batch] ${res.error}` };
      board = res.value.board;
      moved.push(res.value.task);
    }
    return { ok: true, value: { board, tasks: moved } };
  }

  addLabelToTasks(labelName: string, ...ids: ID[]): Result<{ board: TaskBoard; tasks: Task[] }> {
    const normalized = labelName.trim();
    if (!normalized) return { ok: false, error: "Label name cannot be empty" };
    const newLabel: Label = { id: generateId("label"), name: normalized };
    let board: TaskBoard = this;
    const updated: Task[] = [];
    for (const id of ids) {
      const t = board.getTask(id);
      if (!t) return { ok: false, error: `Task ${id} not found` };
      const labels = uniqueLabels([...(t.labels || []), newLabel]);
      const res = board.updateTask(id, { labels });
      if (!res.ok) return { ok: false, error: `[Batch] ${res.error}` };
      board = res.value.board;
      updated.push(res.value.task);
    }
    return { ok: true, value: { board, tasks: updated } };
  }

  removeLabelFromTasks(labelName: string, ...ids: ID[]): Result<{ board: TaskBoard; tasks: Task[] }> {
    const key = labelName.trim().toLowerCase();
    let board: TaskBoard = this;
    const updated: Task[] = [];
    for (const id of ids) {
      const t = board.getTask(id);
      if (!t) return { ok: false, error: `Task ${id} not found` };
      const labels = (t.labels || []).filter(l => l.name.trim().toLowerCase() !== key);
      const res = board.updateTask(id, { labels });
      if (!res.ok) return { ok: false, error: `[Batch] ${res.error}` };
      board = res.value.board;
      updated.push(res.value.task);
    }
    return { ok: true, value: { board, tasks: updated } };
  }

  deleteTask(id: ID): Result<{ board: TaskBoard; deleted: Task }> {
    const existing = this.tasksById.get(id);
    if (!existing) return { ok: false, error: `Task ${id} not found` };

    const { tasksById, indexByAssignee, indexByLabel } = this.cloneMaps();

    // Remove from main store
    tasksById.delete(id);

    // Remove from assignee index
    if (existing.assigneeId) {
      this.removeFromAssigneeIndex(indexByAssignee, existing.assigneeId, id);
    }

    // Remove from label index
    for (const l of existing.labels || []) {
      this.removeFromLabelIndex(indexByLabel, l.name, id);
    }

    return { ok: true, value: { board: new TaskBoard(tasksById, indexByAssignee, indexByLabel), deleted: existing } };
  }

  search(q: SearchQuery): Task[] {
    const text = q.text?.trim().toLowerCase();
    const labelKey = q.label?.trim().toLowerCase();
    return this.listTasks()
      .filter(t => (q.status ? t.status === q.status : true))
      .filter(t => (q.assigneeId ? t.assigneeId === q.assigneeId : true))
      .filter(t =>
        text
          ? (t.title + " " + (t.description ?? "")).toLowerCase().includes(text)
          : true
      )
      .filter(t =>
        labelKey
          ? (t.labels || []).some(l => l.name.trim().toLowerCase() === labelKey)
          : true
      );
  }

  getWipCount(): number {
    return this.listTasks().filter(t => WIP_STATUSES.includes(t.status)).length;
  }

  getPointsByStatus(): Record<Status, number> {
    const base: Record<Status, number> = { BACKLOG: 0, IN_PROGRESS: 0, REVIEW: 0, DONE: 0 };
    return this.listTasks().reduce((acc, t) => {
      acc[t.status] += t.points || 0;
      return acc;
    }, base);
  }

  getTasksDueBefore(date: ISODate): Task[] {
    return this.listTasks().filter(t => t.dueDate && new Date(t.dueDate) < new Date(date));
  }
}
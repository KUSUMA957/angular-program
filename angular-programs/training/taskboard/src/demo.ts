import { TaskBoard } from "./taskboard";
import { Sprint, CreateTask, Label, User } from "./types";
import { generateId, nowISO } from "./utils";
import { SprintMetrics } from "./sprintMetrics";

function log(title: string, data: unknown) {
  console.log(`\n=== ${title} ===`);
  console.log(JSON.stringify(data, null, 2));
}

// Sample setup
const users: User[] = [
  { id: "u_kusuma", name: "Kusuma" },
  { id: "u_ravi", name: "Ravi" },
  { id: "u_meena", name: "Meena" }
];

const labels: Label[] = [
  { id: "l_frontend", name: "frontend" },
  { id: "l_backend", name: "backend" },
  { id: "l_api", name: "api" },
  { id: "l_ui", name: "ui" },
  { id: "l_integration", name: "integration" },
  { id: "l_qa", name: "qa" },
  { id: "l_urgent", name: "urgent" }
];

// Start with empty board
let board = TaskBoard.empty();

// Create tasks (CreateTask = Task without id/createdAt/updatedAt)
const t1: CreateTask = {
  title: "Build Dashboard UI",
  description: "Implement layout and components",
  status: "BACKLOG",
  assigneeId: users[0].id,
  points: 5,
  labels: [labels[0], labels[3]], // frontend, ui
  dueDate: new Date(Date.now() + 5 * 86400000).toISOString()
};

const t2: CreateTask = {
  title: "API for Dashboard Stats",
  description: "Provide aggregated stats endpoint",
  status: "BACKLOG",
  assigneeId: users[1].id,
  points: 8,
  labels: [labels[1], labels[2]] // backend, api
};

const t3: CreateTask = {
  title: "Integrate Dashboard API & UI",
  description: "Wire API into UI components",
  status: "BACKLOG",
  assigneeId: users[0].id,
  points: 5,
  labels: [labels[4]] // integration
};

const t4: CreateTask = {
  title: "Test Dashboard Features",
  description: "Create and run test cases",
  status: "BACKLOG",
  assigneeId: users[2].id,
  points: 3,
  labels: [labels[5]] // qa
};

// Create tasks on the board (immutably)
let res1 = board.createTask(t1); if (!res1.ok) throw new Error(res1.error); board = res1.value.board;
let res2 = board.createTask(t2); if (!res2.ok) throw new Error(res2.error); board = res2.value.board;
let res3 = board.createTask(t3); if (!res3.ok) throw new Error(res3.error); board = res3.value.board;
let res4 = board.createTask(t4); if (!res4.ok) throw new Error(res4.error); board = res4.value.board;

const task1 = res1.value.task;
const task2 = res2.value.task;
const task3 = res3.value.task;
const task4 = res4.value.task;
log("Tasks after creation", board.listTasks());

// Move tasks through workflow (Backlog → In Progress)
let m1 = board.moveTask(task1.id, "IN_PROGRESS"); if (!m1.ok) throw new Error(m1.error); board = m1.value.board;
let m2 = board.moveTask(task2.id, "IN_PROGRESS"); if (!m2.ok) throw new Error(m2.error); board = m2.value.board;

log("WIP count after starting t1 & t2", board.getWipCount());

// Batch: add a label to tasks (rest params)
const b1 = board.addLabelToTasks("urgent", task1.id, task3.id);
if (!b1.ok) throw new Error(b1.error);
board = b1.value.board;
log("Tasks after adding 'urgent' label to t1 & t3", board.listTasks());

// Move forward: t1 to REVIEW, t2 to REVIEW
let m3 = board.moveTask(task1.id, "REVIEW"); if (!m3.ok) throw new Error(m3.error); board = m3.value.board;
let m4 = board.moveTask(task2.id, "REVIEW"); if (!m4.ok) throw new Error(m4.error); board = m4.value.board;

// Attempt invalid move: BACKLOG → DONE for t3 (should fail)
const invalid = board.moveTask(task3.id, "DONE");
if (!invalid.ok) log("Invalid transition (expected)", invalid.error);

// Finish t1 (REVIEW → DONE)
let m5 = board.moveTask(task1.id, "DONE"); if (!m5.ok) throw new Error(m5.error); board = m5.value.board;

// Search examples
log("Search: assigned to Kusuma", board.search({ assigneeId: users[0].id }));
log("Search: label=backend", board.search({ label: "backend" }));
log("Search: status=IN_PROGRESS", board.search({ status: "IN_PROGRESS" }));
log("Search: text='API'", board.search({ text: "API" }));

// Points by status
log("Points by status", board.getPointsByStatus());

// Tasks due before date
const futureDate = new Date(Date.now() + 7 * 86400000).toISOString();
log(`Tasks due before ${futureDate}`, board.getTasksDueBefore(futureDate));

// Define a sprint covering today → 10 days
const start = nowISO();
const end = new Date(Date.now() + 10 * 86400000).toISOString();

const sprint: Sprint = {
  id: generateId("sprint"),
  name: "Sprint 12",
  startDate: start,
  endDate: end,
  taskIds: [task1.id, task2.id, task3.id, task4.id]
};

// Metrics
log("Sprint total story points", SprintMetrics.totalStoryPoints(board, sprint));
log("Sprint burndown", SprintMetrics.burndown(board, sprint));
log("Sprint average cycle time (days)", SprintMetrics.averageCycleTime(board, sprint));
log("Current WIP count (instant)", SprintMetrics.wipCount(board));

// Batch move example using rest params: move t2 and t3 to REVIEW
const bm = board.moveTasks("REVIEW", task2.id, task3.id);
if (!bm.ok) throw new Error(bm.error);
board = bm.value.board;
log("After batch move to REVIEW (t2, t3)", board.listTasks());
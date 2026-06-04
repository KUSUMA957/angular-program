import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import {
  CreateTask,
  ID,
  ISODate,
  Label,
  SearchQuery,
  Sprint,
  Status,
  Task,
  User
} from "./types";
import { TaskBoard } from "./taskboard";
import { SprintMetrics } from "./sprintMetrics";
import { generateId, nowISO } from "./utils";

/** ---------- Seed data (optional) ---------- */
const users: User[] = [
  { id: "u_kusuma", name: "Kusuma" },
  { id: "u_ravi", name: "Ravi" },
  { id: "u_meena", name: "Meena" }
];

const knownLabelNames = ["frontend", "backend", "api", "ui", "integration", "qa", "urgent"];
const labelsByName = new Map<string, Label>(
  knownLabelNames.map(n => [n, { id: `l_${n}`, name: n }])
);

/** ---------- CLI State ---------- */
let board = TaskBoard.empty();
const sprints = new Map<ID, Sprint>();

/** ---------- Helpers ---------- */
function print(obj: unknown) {
  console.log(JSON.stringify(obj, null, 2));
}

function parseStatus(s: string | undefined): Status | undefined {
  if (!s) return undefined;
  const v = s.trim().toUpperCase();
  if (v === "BACKLOG" || v === "IN_PROGRESS" || v === "REVIEW" || v === "DONE") return v;
  return undefined;
}

function parsePoints(s: string | undefined): number | undefined {
  if (!s) return undefined;
  const n = Number(s);
  return Number.isFinite(n) ? n : undefined;
}

function parseISODateOrUndefined(s: string | undefined): ISODate | undefined {
  if (!s) return undefined;
  const d = new Date(s);
  if (isNaN(d.getTime())) return undefined;
  return d.toISOString();
}

function parseIdList(s: string | undefined): ID[] {
  if (!s) return [];
  return s
    .split(/[,\s]+/)
    .map(x => x.trim())
    .filter(Boolean);
}

function upsertLabelsFromNames(raw: string | undefined): Label[] {
  if (!raw) return [];
  const names = Array.from(
    new Set(
      raw
        .split(/[,\s]+/)
        .map(x => x.trim())
        .filter(Boolean)
        .map(x => x.toLowerCase())
    )
  );
  const out: Label[] = [];
  for (const n of names) {
    let l = labelsByName.get(n);
    if (!l) {
      l = { id: generateId("label"), name: n };
      labelsByName.set(n, l);
    }
    out.push(l);
  }
  return out;
}

function listMenu() {
  console.log(`
================= Task Board CLI =================
Users: ${users.map(u => `${u.name}(${u.id})`).join(", ")}
Known Labels: ${Array.from(labelsByName.values()).map(l => l.name).join(", ")}

[1]  List tasks
[2]  Create task
[3]  Update task (partial)
[4]  Delete task
[5]  Move task (status)
[6]  Batch move tasks
[7]  Add label(s) to tasks
[8]  Remove label from tasks
[9]  Search tasks
[10] WIP count
[11] Points by status
[12] Tasks due before date
[13] Create sprint
[14] List sprints
[15] Sprint metrics (burndown / total / avg cycle / WIP)
[16] Seed sample tasks
[0]  Exit
==================================================
`);
}

/** ---------- Actions ---------- */
// async function actionListTasks() {
//   const tasks = board.listTasks();
//   print(tasks);
// }

async function actionListTasks() {
  const tasks = board.listTasks().sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  console.log(`Total tasks: ${tasks.length}`);
  print(tasks);
}


// async function actionCreateTask(rl: readline.Interface) {
//   const title = (await rl.question("Title: ")).trim();
//   const description = (await rl.question("Description (optional): ")).trim();
//   const assigneeId = (await rl.question("Assignee ID (optional, e.g., u_kusuma): ")).trim() || undefined;
//   const status = parseStatus(await rl.question("Status [BACKLOG|IN_PROGRESS|REVIEW|DONE] (default BACKLOG): "));
//   const points = parsePoints(await rl.question("Story points (number, default 0): ")) ?? 0;
//   const labelsInput = await rl.question("Labels (comma/space separated, e.g., frontend ui): ");
//   const labels = upsertLabelsFromNames(labelsInput);
//   const due = parseISODateOrUndefined(await rl.question("Due date (ISO like 2026-03-10 or 2026-03-10T12:00, optional): "));

//   const payload: CreateTask = {
//     title,
//     description: description || undefined,
//     status: status ?? "BACKLOG",
//     assigneeId,
//     points,
//     labels,
//     dueDate: due
//   };

//   const res = board.createTask(payload);
//   if (!res.ok) return console.log("❌", res.error);
//   board = res.value.board;
//   console.log("✅ Task created");
//   print(res.value.task);
// }
async function actionCreateTask(rl: readline.Interface) {
  const title = (await rl.question("Title: ")).trim();
  const description = (await rl.question("Description (optional): ")).trim();
  const assigneeId = (await rl.question("Assignee ID (optional, e.g., u_kusuma): ")).trim() || undefined;
  const status = parseStatus(await rl.question("Status [BACKLOG|IN_PROGRESS|REVIEW|DONE] (default BACKLOG): "));
  const points = parsePoints(await rl.question("Story points (number, default 0): ")) ?? 0;
  const labelsInput = await rl.question("Labels (comma/space separated, e.g., frontend ui): ");
  const labels = upsertLabelsFromNames(labelsInput);
  const due = parseISODateOrUndefined(await rl.question("Due date (ISO like 2026-05-03 or 2026-05-03T12:00, optional): "));

  const payload: CreateTask = {
    title,
    description: description || undefined,
    status: status ?? "BACKLOG",
    assigneeId,
    points,
    labels,
    dueDate: due
  };

  const res = board.createTask(payload);
  if (!res.ok) return console.log("❌", res.error);

  board = res.value.board;
  console.log("✅ Task created");
  print(res.value.task);

  // 👇 Immediately show the updated list so you can see it in context
  const tasks = board.listTasks().sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  console.log(`\n📋 Updated task list (newest first) — total: ${tasks.length}`);
  print(tasks);
}

async function actionUpdateTask(rl: readline.Interface) {
  const id = (await rl.question("Task ID to update: ")).trim();
  const existing = board.getTask(id);
  if (!existing) return console.log("❌ Task not found");

  console.log("Leave fields empty to keep current value.");
  const title = (await rl.question(`Title [${existing.title}]: `)).trim() || undefined;
  const desc = (await rl.question(`Description [${existing.description ?? ""}]: `)).trim() || undefined;
  const assigneeId = (await rl.question(`Assignee ID [${existing.assigneeId ?? ""}]: `)).trim() || undefined;
  const status = parseStatus(await rl.question(`Status [${existing.status}] (BACKLOG|IN_PROGRESS|REVIEW|DONE): `));
  const points = parsePoints(await rl.question(`Points [${existing.points}]: `));
  const labelsInput = await rl.question(
    `Labels (comma/space, current: ${(existing.labels || []).map(l => l.name).join(" ")}) — leave blank to keep: `
  );
  const due = parseISODateOrUndefined(await rl.question(`Due date [${existing.dueDate ?? ""}]: `));

  const patch: any = {};
  if (title !== undefined) patch.title = title;
  if (desc !== undefined) patch.description = desc;
  if (assigneeId !== undefined) patch.assigneeId = assigneeId || undefined;
  if (status !== undefined) patch.status = status;
  if (points !== undefined) patch.points = points;
  if (labelsInput.trim()) patch.labels = upsertLabelsFromNames(labelsInput);
  if (due !== undefined) patch.dueDate = due;

  const res = board.updateTask(id, patch);
  if (!res.ok) return console.log("❌", res.error);
  board = res.value.board;
  console.log("✅ Task updated");
  print(res.value.task);
}

async function actionDeleteTask(rl: readline.Interface) {
  const id = (await rl.question("Task ID to delete: ")).trim();
  const res = board.deleteTask(id);
  if (!res.ok) return console.log("❌", res.error);
  board = res.value.board;
  console.log("✅ Task deleted");
  print(res.value.deleted);
}

async function actionMoveTask(rl: readline.Interface) {
  const id = (await rl.question("Task ID to move: ")).trim();
  const status = parseStatus(await rl.question("Move to [BACKLOG|IN_PROGRESS|REVIEW|DONE]: "));
  if (!status) return console.log("❌ Invalid status");
  const res = board.moveTask(id, status);
  if (!res.ok) return console.log("❌", res.error);
  board = res.value.board;
  console.log("✅ Task moved");
  print(res.value.task);
}

async function actionBatchMove(rl: readline.Interface) {
  const status = parseStatus(await rl.question("Move to [BACKLOG|IN_PROGRESS|REVIEW|DONE]: "));
  if (!status) return console.log("❌ Invalid status");
  const ids = parseIdList(await rl.question("Task IDs (comma/space separated): "));
  if (ids.length === 0) return console.log("❌ No IDs provided");
  const res = board.moveTasks(status, ...ids);
  if (!res.ok) return console.log("❌", res.error);
  board = res.value.board;
  console.log(`✅ Moved ${res.value.tasks.length} task(s)`);
  print(res.value.tasks);
}

async function actionAddLabels(rl: readline.Interface) {
  const names = await rl.question("Label names to add (comma/space): ");
  const ids = parseIdList(await rl.question("Task IDs (comma/space): "));
  if (!names.trim() || ids.length === 0) return console.log("❌ Provide labels and task IDs");
  const firstName = names.split(/[,\s]+/).map(s => s.trim()).filter(Boolean)[0];
  const res = board.addLabelToTasks(firstName, ...ids);
  if (!res.ok) return console.log("❌", res.error);
  board = res.value.board;
  console.log("✅ Label added");
  print(res.value.tasks);
}

async function actionRemoveLabel(rl: readline.Interface) {
  const name = (await rl.question("Label name to remove: ")).trim();
  const ids = parseIdList(await rl.question("Task IDs (comma/space): "));
  if (!name || ids.length === 0) return console.log("❌ Provide label name and task IDs");
  const res = board.removeLabelFromTasks(name, ...ids);
  if (!res.ok) return console.log("❌", res.error);
  board = res.value.board;
  console.log("✅ Label removed");
  print(res.value.tasks);
}

async function actionSearch(rl: readline.Interface) {
  const text = (await rl.question("Text (optional): ")).trim() || undefined;
  const assigneeId = (await rl.question("Assignee ID (optional): ")).trim() || undefined;
  const status = parseStatus(await rl.question("Status [BACKLOG|IN_PROGRESS|REVIEW|DONE] (optional): "));
  const label = (await rl.question("Label name (optional): ")).trim() || undefined;

  const query: SearchQuery = { text, assigneeId, status, label };
  const results = board.search(query);
  console.log(`✅ Found ${results.length} task(s)`);
  print(results);
}

async function actionWipCount() {
  console.log("WIP count:", board.getWipCount());
}

async function actionPointsByStatus() {
  print(board.getPointsByStatus());
}

async function actionDueBefore(rl: readline.Interface) {
  const d = (await rl.question("Date (ISO like 2026-03-10 or 2026-03-10T12:00): ")).trim();
  const iso = parseISODateOrUndefined(d);
  if (!iso) return console.log("❌ Invalid date");
  const tasks = board.getTasksDueBefore(iso);
  print(tasks);
}

async function actionCreateSprint(rl: readline.Interface) {
  const name = (await rl.question("Sprint name: ")).trim() || "Sprint";
  const start = parseISODateOrUndefined(await rl.question("Start date (ISO, default now): "));
  const end = parseISODateOrUndefined(await rl.question("End date (ISO, required): "));
  if (!end) return console.log("❌ End date required");

  const ids = parseIdList(await rl.question("Task IDs for sprint (comma/space): "));

  const sprint: Sprint = {
    id: generateId("sprint"),
    name,
    startDate: start ?? nowISO(),
    endDate: end,
    taskIds: ids
  };
  sprints.set(sprint.id, sprint);
  console.log("✅ Sprint created:");
  print(sprint);
}

async function actionListSprints() {
  print(Array.from(sprints.values()));
}

async function actionSprintMetrics(rl: readline.Interface) {
  if (sprints.size === 0) {
    console.log("ℹ️ No sprints. Create one first.");
    return;
  }
  const sid = (await rl.question("Sprint ID: ")).trim();
  const sprint = sprints.get(sid);
  if (!sprint) return console.log("❌ Sprint not found");

  const total = SprintMetrics.totalStoryPoints(board, sprint);
  const burndown = SprintMetrics.burndown(board, sprint);
  const avgCycle = SprintMetrics.averageCycleTime(board, sprint);
  const wip = SprintMetrics.wipCount(board);

  console.log("✅ Sprint Metrics");
  print({ totalStoryPoints: total, averageCycleTimeDays: avgCycle, wipCount: wip });
  console.log("Burndown series:");
  print(burndown);
}

async function actionSeed() {
  // Seed similar to the previous demo
  const seedTasks: Array<CreateTask> = [
    {
      title: "Build Dashboard UI",
      description: "Implement layout and components",
      status: "BACKLOG",
      assigneeId: "u_kusuma",
      points: 5,
      labels: [labelsByName.get("frontend")!, labelsByName.get("ui")!],
      dueDate: new Date(Date.now() + 5 * 86400000).toISOString()
    },
    {
      title: "API for Dashboard Stats",
      description: "Provide aggregated stats endpoint",
      status: "BACKLOG",
      assigneeId: "u_ravi",
      points: 8,
      labels: [labelsByName.get("backend")!, labelsByName.get("api")!]
    },
    {
      title: "Integrate Dashboard API & UI",
      description: "Wire API into UI components",
      status: "BACKLOG",
      assigneeId: "u_kusuma",
      points: 5,
      labels: [labelsByName.get("integration")!]
    },
    {
      title: "Test Dashboard Features",
      description: "Create and run test cases",
      status: "BACKLOG",
      assigneeId: "u_meena",
      points: 3,
      labels: [labelsByName.get("qa")!]
    }
  ];

  for (const t of seedTasks) {
    const r = board.createTask(t);
    if (r.ok) board = r.value.board;
  }

  console.log("✅ Seeded tasks");
  print(board.listTasks());
}

/** ---------- Main Loop ---------- */
async function main() {
  const rl = readline.createInterface({ input, output });
  console.log("Welcome to Task Board CLI (TypeScript).");

  let running = true;
  while (running) {
    try {
      listMenu();
      const choice = (await rl.question("Choose an option (0 to exit): ")).trim();

      switch (choice) {
        case "1": await actionListTasks(); break;
        case "2": await actionCreateTask(rl); break;
        case "3": await actionUpdateTask(rl); break;
        case "4": await actionDeleteTask(rl); break;
        case "5": await actionMoveTask(rl); break;
        case "6": await actionBatchMove(rl); break;
        case "7": await actionAddLabels(rl); break;
        case "8": await actionRemoveLabel(rl); break;
        case "9": await actionSearch(rl); break;
        case "10": await actionWipCount(); break;
        case "11": await actionPointsByStatus(); break;
        case "12": await actionDueBefore(rl); break;
        case "13": await actionCreateSprint(rl); break;
        case "14": await actionListSprints(); break;
        case "15": await actionSprintMetrics(rl); break;
        case "16": await actionSeed(); break;
        case "0": running = false; break;
        default:
          console.log("Unknown option. Please choose a number from the menu.");
      }
    } catch (err: any) {
      console.log("❌ Error:", err?.message ?? String(err));
    }
  }

  console.log("Goodbye!");
  rl.close();
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
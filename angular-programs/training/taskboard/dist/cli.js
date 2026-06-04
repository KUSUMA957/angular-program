"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("node:readline/promises"));
const node_process_1 = require("node:process");
const taskboard_1 = require("./taskboard");
const sprintMetrics_1 = require("./sprintMetrics");
const utils_1 = require("./utils");
/** ---------- Seed data (optional) ---------- */
const users = [
    { id: "u_kusuma", name: "Kusuma" },
    { id: "u_ravi", name: "Ravi" },
    { id: "u_meena", name: "Meena" }
];
const knownLabelNames = ["frontend", "backend", "api", "ui", "integration", "qa", "urgent"];
const labelsByName = new Map(knownLabelNames.map(n => [n, { id: `l_${n}`, name: n }]));
/** ---------- CLI State ---------- */
let board = taskboard_1.TaskBoard.empty();
const sprints = new Map();
/** ---------- Helpers ---------- */
function print(obj) {
    console.log(JSON.stringify(obj, null, 2));
}
function parseStatus(s) {
    if (!s)
        return undefined;
    const v = s.trim().toUpperCase();
    if (v === "BACKLOG" || v === "IN_PROGRESS" || v === "REVIEW" || v === "DONE")
        return v;
    return undefined;
}
function parsePoints(s) {
    if (!s)
        return undefined;
    const n = Number(s);
    return Number.isFinite(n) ? n : undefined;
}
function parseISODateOrUndefined(s) {
    if (!s)
        return undefined;
    const d = new Date(s);
    if (isNaN(d.getTime()))
        return undefined;
    return d.toISOString();
}
function parseIdList(s) {
    if (!s)
        return [];
    return s
        .split(/[,\s]+/)
        .map(x => x.trim())
        .filter(Boolean);
}
function upsertLabelsFromNames(raw) {
    if (!raw)
        return [];
    const names = Array.from(new Set(raw
        .split(/[,\s]+/)
        .map(x => x.trim())
        .filter(Boolean)
        .map(x => x.toLowerCase())));
    const out = [];
    for (const n of names) {
        let l = labelsByName.get(n);
        if (!l) {
            l = { id: (0, utils_1.generateId)("label"), name: n };
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
    const tasks = board.listTasks().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
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
async function actionCreateTask(rl) {
    const title = (await rl.question("Title: ")).trim();
    const description = (await rl.question("Description (optional): ")).trim();
    const assigneeId = (await rl.question("Assignee ID (optional, e.g., u_kusuma): ")).trim() || undefined;
    const status = parseStatus(await rl.question("Status [BACKLOG|IN_PROGRESS|REVIEW|DONE] (default BACKLOG): "));
    const points = parsePoints(await rl.question("Story points (number, default 0): ")) ?? 0;
    const labelsInput = await rl.question("Labels (comma/space separated, e.g., frontend ui): ");
    const labels = upsertLabelsFromNames(labelsInput);
    const due = parseISODateOrUndefined(await rl.question("Due date (ISO like 2026-05-03 or 2026-05-03T12:00, optional): "));
    const payload = {
        title,
        description: description || undefined,
        status: status ?? "BACKLOG",
        assigneeId,
        points,
        labels,
        dueDate: due
    };
    const res = board.createTask(payload);
    if (!res.ok)
        return console.log("❌", res.error);
    board = res.value.board;
    console.log("✅ Task created");
    print(res.value.task);
    // 👇 Immediately show the updated list so you can see it in context
    const tasks = board.listTasks().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    console.log(`\n📋 Updated task list (newest first) — total: ${tasks.length}`);
    print(tasks);
}
async function actionUpdateTask(rl) {
    const id = (await rl.question("Task ID to update: ")).trim();
    const existing = board.getTask(id);
    if (!existing)
        return console.log("❌ Task not found");
    console.log("Leave fields empty to keep current value.");
    const title = (await rl.question(`Title [${existing.title}]: `)).trim() || undefined;
    const desc = (await rl.question(`Description [${existing.description ?? ""}]: `)).trim() || undefined;
    const assigneeId = (await rl.question(`Assignee ID [${existing.assigneeId ?? ""}]: `)).trim() || undefined;
    const status = parseStatus(await rl.question(`Status [${existing.status}] (BACKLOG|IN_PROGRESS|REVIEW|DONE): `));
    const points = parsePoints(await rl.question(`Points [${existing.points}]: `));
    const labelsInput = await rl.question(`Labels (comma/space, current: ${(existing.labels || []).map(l => l.name).join(" ")}) — leave blank to keep: `);
    const due = parseISODateOrUndefined(await rl.question(`Due date [${existing.dueDate ?? ""}]: `));
    const patch = {};
    if (title !== undefined)
        patch.title = title;
    if (desc !== undefined)
        patch.description = desc;
    if (assigneeId !== undefined)
        patch.assigneeId = assigneeId || undefined;
    if (status !== undefined)
        patch.status = status;
    if (points !== undefined)
        patch.points = points;
    if (labelsInput.trim())
        patch.labels = upsertLabelsFromNames(labelsInput);
    if (due !== undefined)
        patch.dueDate = due;
    const res = board.updateTask(id, patch);
    if (!res.ok)
        return console.log("❌", res.error);
    board = res.value.board;
    console.log("✅ Task updated");
    print(res.value.task);
}
async function actionDeleteTask(rl) {
    const id = (await rl.question("Task ID to delete: ")).trim();
    const res = board.deleteTask(id);
    if (!res.ok)
        return console.log("❌", res.error);
    board = res.value.board;
    console.log("✅ Task deleted");
    print(res.value.deleted);
}
async function actionMoveTask(rl) {
    const id = (await rl.question("Task ID to move: ")).trim();
    const status = parseStatus(await rl.question("Move to [BACKLOG|IN_PROGRESS|REVIEW|DONE]: "));
    if (!status)
        return console.log("❌ Invalid status");
    const res = board.moveTask(id, status);
    if (!res.ok)
        return console.log("❌", res.error);
    board = res.value.board;
    console.log("✅ Task moved");
    print(res.value.task);
}
async function actionBatchMove(rl) {
    const status = parseStatus(await rl.question("Move to [BACKLOG|IN_PROGRESS|REVIEW|DONE]: "));
    if (!status)
        return console.log("❌ Invalid status");
    const ids = parseIdList(await rl.question("Task IDs (comma/space separated): "));
    if (ids.length === 0)
        return console.log("❌ No IDs provided");
    const res = board.moveTasks(status, ...ids);
    if (!res.ok)
        return console.log("❌", res.error);
    board = res.value.board;
    console.log(`✅ Moved ${res.value.tasks.length} task(s)`);
    print(res.value.tasks);
}
async function actionAddLabels(rl) {
    const names = await rl.question("Label names to add (comma/space): ");
    const ids = parseIdList(await rl.question("Task IDs (comma/space): "));
    if (!names.trim() || ids.length === 0)
        return console.log("❌ Provide labels and task IDs");
    const firstName = names.split(/[,\s]+/).map(s => s.trim()).filter(Boolean)[0];
    const res = board.addLabelToTasks(firstName, ...ids);
    if (!res.ok)
        return console.log("❌", res.error);
    board = res.value.board;
    console.log("✅ Label added");
    print(res.value.tasks);
}
async function actionRemoveLabel(rl) {
    const name = (await rl.question("Label name to remove: ")).trim();
    const ids = parseIdList(await rl.question("Task IDs (comma/space): "));
    if (!name || ids.length === 0)
        return console.log("❌ Provide label name and task IDs");
    const res = board.removeLabelFromTasks(name, ...ids);
    if (!res.ok)
        return console.log("❌", res.error);
    board = res.value.board;
    console.log("✅ Label removed");
    print(res.value.tasks);
}
async function actionSearch(rl) {
    const text = (await rl.question("Text (optional): ")).trim() || undefined;
    const assigneeId = (await rl.question("Assignee ID (optional): ")).trim() || undefined;
    const status = parseStatus(await rl.question("Status [BACKLOG|IN_PROGRESS|REVIEW|DONE] (optional): "));
    const label = (await rl.question("Label name (optional): ")).trim() || undefined;
    const query = { text, assigneeId, status, label };
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
async function actionDueBefore(rl) {
    const d = (await rl.question("Date (ISO like 2026-03-10 or 2026-03-10T12:00): ")).trim();
    const iso = parseISODateOrUndefined(d);
    if (!iso)
        return console.log("❌ Invalid date");
    const tasks = board.getTasksDueBefore(iso);
    print(tasks);
}
async function actionCreateSprint(rl) {
    const name = (await rl.question("Sprint name: ")).trim() || "Sprint";
    const start = parseISODateOrUndefined(await rl.question("Start date (ISO, default now): "));
    const end = parseISODateOrUndefined(await rl.question("End date (ISO, required): "));
    if (!end)
        return console.log("❌ End date required");
    const ids = parseIdList(await rl.question("Task IDs for sprint (comma/space): "));
    const sprint = {
        id: (0, utils_1.generateId)("sprint"),
        name,
        startDate: start ?? (0, utils_1.nowISO)(),
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
async function actionSprintMetrics(rl) {
    if (sprints.size === 0) {
        console.log("ℹ️ No sprints. Create one first.");
        return;
    }
    const sid = (await rl.question("Sprint ID: ")).trim();
    const sprint = sprints.get(sid);
    if (!sprint)
        return console.log("❌ Sprint not found");
    const total = sprintMetrics_1.SprintMetrics.totalStoryPoints(board, sprint);
    const burndown = sprintMetrics_1.SprintMetrics.burndown(board, sprint);
    const avgCycle = sprintMetrics_1.SprintMetrics.averageCycleTime(board, sprint);
    const wip = sprintMetrics_1.SprintMetrics.wipCount(board);
    console.log("✅ Sprint Metrics");
    print({ totalStoryPoints: total, averageCycleTimeDays: avgCycle, wipCount: wip });
    console.log("Burndown series:");
    print(burndown);
}
async function actionSeed() {
    // Seed similar to the previous demo
    const seedTasks = [
        {
            title: "Build Dashboard UI",
            description: "Implement layout and components",
            status: "BACKLOG",
            assigneeId: "u_kusuma",
            points: 5,
            labels: [labelsByName.get("frontend"), labelsByName.get("ui")],
            dueDate: new Date(Date.now() + 5 * 86400000).toISOString()
        },
        {
            title: "API for Dashboard Stats",
            description: "Provide aggregated stats endpoint",
            status: "BACKLOG",
            assigneeId: "u_ravi",
            points: 8,
            labels: [labelsByName.get("backend"), labelsByName.get("api")]
        },
        {
            title: "Integrate Dashboard API & UI",
            description: "Wire API into UI components",
            status: "BACKLOG",
            assigneeId: "u_kusuma",
            points: 5,
            labels: [labelsByName.get("integration")]
        },
        {
            title: "Test Dashboard Features",
            description: "Create and run test cases",
            status: "BACKLOG",
            assigneeId: "u_meena",
            points: 3,
            labels: [labelsByName.get("qa")]
        }
    ];
    for (const t of seedTasks) {
        const r = board.createTask(t);
        if (r.ok)
            board = r.value.board;
    }
    console.log("✅ Seeded tasks");
    print(board.listTasks());
}
/** ---------- Main Loop ---------- */
async function main() {
    const rl = readline.createInterface({ input: node_process_1.stdin, output: node_process_1.stdout });
    console.log("Welcome to Task Board CLI (TypeScript).");
    let running = true;
    while (running) {
        try {
            listMenu();
            const choice = (await rl.question("Choose an option (0 to exit): ")).trim();
            switch (choice) {
                case "1":
                    await actionListTasks();
                    break;
                case "2":
                    await actionCreateTask(rl);
                    break;
                case "3":
                    await actionUpdateTask(rl);
                    break;
                case "4":
                    await actionDeleteTask(rl);
                    break;
                case "5":
                    await actionMoveTask(rl);
                    break;
                case "6":
                    await actionBatchMove(rl);
                    break;
                case "7":
                    await actionAddLabels(rl);
                    break;
                case "8":
                    await actionRemoveLabel(rl);
                    break;
                case "9":
                    await actionSearch(rl);
                    break;
                case "10":
                    await actionWipCount();
                    break;
                case "11":
                    await actionPointsByStatus();
                    break;
                case "12":
                    await actionDueBefore(rl);
                    break;
                case "13":
                    await actionCreateSprint(rl);
                    break;
                case "14":
                    await actionListSprints();
                    break;
                case "15":
                    await actionSprintMetrics(rl);
                    break;
                case "16":
                    await actionSeed();
                    break;
                case "0":
                    running = false;
                    break;
                default:
                    console.log("Unknown option. Please choose a number from the menu.");
            }
        }
        catch (err) {
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

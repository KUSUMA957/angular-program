"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskBoard = void 0;
const utils_1 = require("./utils");
const FORWARD_ORDER = ["BACKLOG", "IN_PROGRESS", "REVIEW", "DONE"];
const WIP_STATUSES = ["IN_PROGRESS", "REVIEW"];
function canTransition(from, to) {
    const fromIdx = FORWARD_ORDER.indexOf(from);
    const toIdx = FORWARD_ORDER.indexOf(to);
    // allow no-op or move exactly one step forward
    return toIdx === fromIdx || toIdx === fromIdx + 1;
}
class TaskBoard {
    constructor(tasksById, indexByAssignee, indexByLabel) {
        this.tasksById = tasksById;
        this.indexByAssignee = indexByAssignee;
        this.indexByLabel = indexByLabel;
    }
    static empty() {
        return new TaskBoard(new Map(), new Map(), new Map());
    }
    cloneMaps() {
        return {
            tasksById: new Map(this.tasksById),
            indexByAssignee: new Map(this.indexByAssignee),
            indexByLabel: new Map(this.indexByLabel)
        };
    }
    listTasks() {
        return Array.from(this.tasksById.values());
    }
    getTask(id) {
        const t = this.tasksById.get(id);
        return t ? { ...t } : undefined;
    }
    findTaskInSnapshotById(id) {
        return this.listTasks().find(t => t.id === id);
    }
    addToAssigneeIndex(index, assigneeId, taskId) {
        const set = new Set(index.get(assigneeId) ?? []);
        set.add(taskId);
        index.set(assigneeId, set);
    }
    removeFromAssigneeIndex(index, assigneeId, taskId) {
        const set = new Set(index.get(assigneeId) ?? []);
        set.delete(taskId);
        if (set.size === 0)
            index.delete(assigneeId);
        else
            index.set(assigneeId, set);
    }
    addToLabelIndex(index, labelName, taskId) {
        const key = labelName.trim().toLowerCase();
        const set = new Set(index.get(key) ?? []);
        set.add(taskId);
        index.set(key, set);
    }
    removeFromLabelIndex(index, labelName, taskId) {
        const key = labelName.trim().toLowerCase();
        const set = new Set(index.get(key) ?? []);
        set.delete(taskId);
        if (set.size === 0)
            index.delete(key);
        else
            index.set(key, set);
    }
    createTask(input) {
        const id = (0, utils_1.generateId)("task");
        const createdAt = (0, utils_1.nowISO)();
        const updatedAt = createdAt;
        const labels = (0, utils_1.uniqueLabels)(input.labels ?? []);
        const task = {
            ...input,
            id,
            labels,
            createdAt,
            updatedAt
        };
        const { tasksById, indexByAssignee, indexByLabel } = this.cloneMaps();
        tasksById.set(id, task);
        if (task.assigneeId)
            this.addToAssigneeIndex(indexByAssignee, task.assigneeId, id);
        for (const l of task.labels)
            this.addToLabelIndex(indexByLabel, l.name, id);
        return { ok: true, value: { board: new TaskBoard(tasksById, indexByAssignee, indexByLabel), task } };
    }
    updateTask(id, patch) {
        const existing = this.tasksById.get(id);
        if (!existing)
            return { ok: false, error: `Task ${id} not found` };
        if (patch.status && !canTransition(existing.status, patch.status)) {
            return { ok: false, error: `Invalid status transition: ${existing.status} → ${patch.status}` };
        }
        const updatedAt = (0, utils_1.nowISO)();
        let next = { ...existing, ...patch, updatedAt };
        const prevLabelNames = new Set((existing.labels || []).map(l => l.name.trim().toLowerCase()));
        const nextLabels = (0, utils_1.uniqueLabels)(next.labels || []);
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
            if (existing.assigneeId)
                this.removeFromAssigneeIndex(indexByAssignee, existing.assigneeId, id);
            if (next.assigneeId)
                this.addToAssigneeIndex(indexByAssignee, next.assigneeId, id);
        }
        for (const oldName of prevLabelNames) {
            if (!nextLabelNames.has(oldName))
                this.removeFromLabelIndex(indexByLabel, oldName, id);
        }
        for (const newName of nextLabelNames) {
            if (!prevLabelNames.has(newName))
                this.addToLabelIndex(indexByLabel, newName, id);
        }
        return { ok: true, value: { board: new TaskBoard(tasksById, indexByAssignee, indexByLabel), task: next } };
    }
    moveTask(id, to) {
        return this.updateTask(id, { status: to });
    }
    moveTasks(to, ...ids) {
        let board = this;
        const moved = [];
        for (const id of ids) {
            const res = board.moveTask(id, to);
            if (!res.ok)
                return { ok: false, error: `[Batch] ${res.error}` };
            board = res.value.board;
            moved.push(res.value.task);
        }
        return { ok: true, value: { board, tasks: moved } };
    }
    addLabelToTasks(labelName, ...ids) {
        const normalized = labelName.trim();
        if (!normalized)
            return { ok: false, error: "Label name cannot be empty" };
        const newLabel = { id: (0, utils_1.generateId)("label"), name: normalized };
        let board = this;
        const updated = [];
        for (const id of ids) {
            const t = board.getTask(id);
            if (!t)
                return { ok: false, error: `Task ${id} not found` };
            const labels = (0, utils_1.uniqueLabels)([...(t.labels || []), newLabel]);
            const res = board.updateTask(id, { labels });
            if (!res.ok)
                return { ok: false, error: `[Batch] ${res.error}` };
            board = res.value.board;
            updated.push(res.value.task);
        }
        return { ok: true, value: { board, tasks: updated } };
    }
    removeLabelFromTasks(labelName, ...ids) {
        const key = labelName.trim().toLowerCase();
        let board = this;
        const updated = [];
        for (const id of ids) {
            const t = board.getTask(id);
            if (!t)
                return { ok: false, error: `Task ${id} not found` };
            const labels = (t.labels || []).filter(l => l.name.trim().toLowerCase() !== key);
            const res = board.updateTask(id, { labels });
            if (!res.ok)
                return { ok: false, error: `[Batch] ${res.error}` };
            board = res.value.board;
            updated.push(res.value.task);
        }
        return { ok: true, value: { board, tasks: updated } };
    }
    deleteTask(id) {
        const existing = this.tasksById.get(id);
        if (!existing)
            return { ok: false, error: `Task ${id} not found` };
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
    search(q) {
        const text = q.text?.trim().toLowerCase();
        const labelKey = q.label?.trim().toLowerCase();
        return this.listTasks()
            .filter(t => (q.status ? t.status === q.status : true))
            .filter(t => (q.assigneeId ? t.assigneeId === q.assigneeId : true))
            .filter(t => text
            ? (t.title + " " + (t.description ?? "")).toLowerCase().includes(text)
            : true)
            .filter(t => labelKey
            ? (t.labels || []).some(l => l.name.trim().toLowerCase() === labelKey)
            : true);
    }
    getWipCount() {
        return this.listTasks().filter(t => WIP_STATUSES.includes(t.status)).length;
    }
    getPointsByStatus() {
        const base = { BACKLOG: 0, IN_PROGRESS: 0, REVIEW: 0, DONE: 0 };
        return this.listTasks().reduce((acc, t) => {
            acc[t.status] += t.points || 0;
            return acc;
        }, base);
    }
    getTasksDueBefore(date) {
        return this.listTasks().filter(t => t.dueDate && new Date(t.dueDate) < new Date(date));
    }
}
exports.TaskBoard = TaskBoard;

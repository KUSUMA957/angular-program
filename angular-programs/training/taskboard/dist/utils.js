"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = generateId;
exports.nowISO = nowISO;
exports.uniqueLabels = uniqueLabels;
exports.toDate = toDate;
exports.isOnOrBefore = isOnOrBefore;
exports.isBetweenInclusive = isBetweenInclusive;
exports.daysBetween = daysBetween;
exports.dateRangeDaily = dateRangeDaily;
exports.computeBurndown = computeBurndown;
exports.averageCycleTime = averageCycleTime;
exports.sumPoints = sumPoints;
/** Generate a reasonably unique ID (no external libs). */
function generateId(prefix = "id") {
    const rand = Math.random().toString(36).slice(2);
    return `${prefix}_${Date.now()}_${rand}`;
}
function nowISO() {
    return new Date().toISOString();
}
/** Deduplicate labels by name (case-insensitive). */
function uniqueLabels(labels) {
    const seen = new Set();
    const result = [];
    for (const l of labels) {
        const key = l.name.trim().toLowerCase();
        if (!seen.has(key)) {
            seen.add(key);
            result.push(l);
        }
    }
    return result;
}
function toDate(d) {
    return new Date(d);
}
function isOnOrBefore(a, b) {
    return toDate(a).getTime() <= toDate(b).getTime();
}
function isBetweenInclusive(target, start, end) {
    const t = toDate(target).getTime();
    return t >= toDate(start).getTime() && t <= toDate(end).getTime();
}
function daysBetween(a, b) {
    const ms = Math.abs(toDate(b).getTime() - toDate(a).getTime());
    return ms / (1000 * 60 * 60 * 24);
}
/** Inclusive date range, daily points (UTC boundaries). */
function dateRangeDaily(start, end) {
    const out = [];
    const cur = new Date(start);
    const endD = new Date(end);
    // Normalize to midnight UTC to stabilize daily steps:
    cur.setUTCHours(0, 0, 0, 0);
    endD.setUTCHours(0, 0, 0, 0);
    while (cur.getTime() <= endD.getTime()) {
        out.push(cur.toISOString());
        cur.setUTCDate(cur.getUTCDate() + 1);
    }
    return out;
}
/** Compute burndown series: remaining points per day over sprint window. */
function computeBurndown(sprint, tasks) {
    const total = tasks.reduce((sum, t) => sum + (t.points ?? 0), 0);
    const days = dateRangeDaily(sprint.startDate, sprint.endDate);
    return days.map(date => {
        const completedByDay = tasks
            .filter(t => t.completedAt && isOnOrBefore(t.completedAt, date))
            .reduce((sum, t) => sum + (t.points ?? 0), 0);
        const remaining = Math.max(0, total - completedByDay);
        return { date, remainingPoints: remaining };
    });
}
/** Average cycle time (days) for tasks completed within sprint window. */
function averageCycleTime(sprint, tasks) {
    const finished = tasks.filter(t => t.startedAt &&
        t.completedAt &&
        isBetweenInclusive(t.completedAt, sprint.startDate, sprint.endDate));
    if (finished.length === 0)
        return 0;
    const totalDays = finished
        .map(t => daysBetween(t.startedAt, t.completedAt))
        .reduce((a, b) => a + b, 0);
    return totalDays / finished.length;
}
/** Sum of points for tasks (convenience). */
function sumPoints(tasks) {
    return tasks.reduce((sum, t) => sum + (t.points || 0), 0);
}

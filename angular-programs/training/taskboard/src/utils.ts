import { ID, ISODate, Label, Points, Sprint, Task } from "./types";

/** Generate a reasonably unique ID (no external libs). */
export function generateId(prefix = "id"): ID {
  const rand = Math.random().toString(36).slice(2);
  return `${prefix}_${Date.now()}_${rand}`;
}

export function nowISO(): ISODate {
  return new Date().toISOString();
}

/** Deduplicate labels by name (case-insensitive). */
export function uniqueLabels(labels: Label[]): Label[] {
  const seen = new Set<string>();
  const result: Label[] = [];
  for (const l of labels) {
    const key = l.name.trim().toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      result.push(l);
    }
  }
  return result;
}

export function toDate(d: ISODate): Date {
  return new Date(d);
}

export function isOnOrBefore(a: ISODate, b: ISODate): boolean {
  return toDate(a).getTime() <= toDate(b).getTime();
}

export function isBetweenInclusive(target: ISODate, start: ISODate, end: ISODate): boolean {
  const t = toDate(target).getTime();
  return t >= toDate(start).getTime() && t <= toDate(end).getTime();
}

export function daysBetween(a: ISODate, b: ISODate): number {
  const ms = Math.abs(toDate(b).getTime() - toDate(a).getTime());
  return ms / (1000 * 60 * 60 * 24);
}

/** Inclusive date range, daily points (UTC boundaries). */
export function dateRangeDaily(start: ISODate, end: ISODate): ISODate[] {
  const out: ISODate[] = [];
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
export function computeBurndown(sprint: Sprint, tasks: Task[]): Array<{ date: ISODate; remainingPoints: Points }> {
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
export function averageCycleTime(sprint: Sprint, tasks: Task[]): number {
  const finished = tasks.filter(
    t =>
      t.startedAt &&
      t.completedAt &&
      isBetweenInclusive(t.completedAt, sprint.startDate, sprint.endDate)
  );
  if (finished.length === 0) return 0;

  const totalDays = finished
    .map(t => daysBetween(t.startedAt!, t.completedAt!))
    .reduce((a, b) => a + b, 0);

  return totalDays / finished.length;
}

/** Sum of points for tasks (convenience). */
export function sumPoints(tasks: Task[]): Points {
  return tasks.reduce((sum, t) => sum + (t.points || 0), 0);
}
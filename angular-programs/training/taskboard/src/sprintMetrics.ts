import { Points, Sprint, Task } from "./types";
import { averageCycleTime, computeBurndown, sumPoints } from "./utils";
import { TaskBoard } from "./taskboard";

export class SprintMetrics {
  /** Total story points in a sprint (sum of points for sprint tasks). */
  static totalStoryPoints(board: TaskBoard, sprint: Sprint): Points {
    const tasks = sprint.taskIds
      .map(id => board.getTask(id))
      .filter((t): t is Task => !!t);
    return sumPoints(tasks);
  }

  /** Burndown series (remaining points per day). */
  static burndown(board: TaskBoard, sprint: Sprint): Array<{ date: string; remainingPoints: number }> {
    const tasks = sprint.taskIds
      .map(id => board.getTask(id))
      .filter((t): t is Task => !!t);
    return computeBurndown(sprint, tasks);
  }

  /** Average cycle time (days) for tasks completed during the sprint window. */
  static averageCycleTime(board: TaskBoard, sprint: Sprint): number {
    const tasks = sprint.taskIds
      .map(id => board.getTask(id))
      .filter((t): t is Task => !!t);
    return averageCycleTime(sprint, tasks);
  }

  /** Current WIP count (instantaneous). */
  static wipCount(board: TaskBoard): number {
    return board.getWipCount();
  }
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SprintMetrics = void 0;
const utils_1 = require("./utils");
class SprintMetrics {
    /** Total story points in a sprint (sum of points for sprint tasks). */
    static totalStoryPoints(board, sprint) {
        const tasks = sprint.taskIds
            .map(id => board.getTask(id))
            .filter((t) => !!t);
        return (0, utils_1.sumPoints)(tasks);
    }
    /** Burndown series (remaining points per day). */
    static burndown(board, sprint) {
        const tasks = sprint.taskIds
            .map(id => board.getTask(id))
            .filter((t) => !!t);
        return (0, utils_1.computeBurndown)(sprint, tasks);
    }
    /** Average cycle time (days) for tasks completed during the sprint window. */
    static averageCycleTime(board, sprint) {
        const tasks = sprint.taskIds
            .map(id => board.getTask(id))
            .filter((t) => !!t);
        return (0, utils_1.averageCycleTime)(sprint, tasks);
    }
    /** Current WIP count (instantaneous). */
    static wipCount(board) {
        return board.getWipCount();
    }
}
exports.SprintMetrics = SprintMetrics;

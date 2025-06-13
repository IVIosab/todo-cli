/**
 * Transforms an array of tasks by converting the 'completed' property to a boolean.
 * 
 * @param {Array} editedTasks - An array of task objects to be processed
 * @returns {Array} A new array of tasks with 'completed' converted to a boolean value
 */
export function parseUpdateTasks(editedTasks) {
    return editedTasks.map(task => ({
        ...task,
        completed: task.completed === "true"
    }));
}

/**
 * Filters out tasks marked for removal and converts the 'completed' property to a boolean.
 * 
 * @param {Array} editedTasks - An array of task objects to be processed
 * @returns {Array} A new array of tasks excluding removed tasks, with 'completed' converted to a boolean value
 */
export function parseRemoveTasks(editedTasks) {
    return editedTasks
        .filter(task => task.remove !== "true")
        .map(({ remove, ...task }) => ({
            ...task,
            completed: task.completed === "true"
        }));
}

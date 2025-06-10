export function parseUpdateTasks(editedTasks) {
    return editedTasks.map(task => ({
        ...task,
        completed: task.completed === "true"
    }));
}

export function parseRemoveTasks(editedTasks) {
    return editedTasks
        .filter(task => task.remove !== "true")
        .map(({ remove, ...task }) => ({
            ...task,
            completed: task.completed === "true"
        }));
}

export function validateUpdateTasks(originalTasks, editedTasks) {
    const originalMap = Object.fromEntries(originalTasks.map(task => [task.id, task]));

    return editedTasks.map(task => {
        const original = originalMap[task.id];
        if (!original) return task;

        if (!["1", "2", "3"].includes(task.priority)) {
            task.priority = original.priority;
        }

        if (!["true", "false"].includes(task.completed)) {
            task.completed = original.completed;
        }

        if (!task.title || task.title.trim() === "") {
            task.title = original.title;
        }

        if (!/^\d{4}-\d{2}-\d{2}$/.test(task.dueDate)) {
            task.dueDate = original.dueDate;
        }

        return task;
    });
}

export function validateRemoveTasks(originalTasks, editedTasks) {
    const originalMap = Object.fromEntries(originalTasks.map(task => [task.id, task]));

    return editedTasks.map(task => {
        const original = originalMap[task.id];
        if (!original) return task;

        if (!["1", "2", "3"].includes(task.priority)) {
            task.priority = original.priority;
        }

        if (!["true", "false"].includes(task.remove)) {
            task.remove = original.remove;
        }

        return task;
    });
}

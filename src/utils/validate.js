import chalk from "chalk";

function logCorrection(taskId, field, expected, actual, reason) {
    console.log(
        `${chalk.red.bold("❌ Task Validation Error")}\n` +
        `  ${chalk.bold("Task ID:")} ${chalk.yellow(taskId)}\n` +
        `  ${chalk.bold("Field:")} ${chalk.cyan(field)}\n` +
        `  ${chalk.bold("Invalid Value:")} ${chalk.red(actual)}\n` +
        `  ${chalk.bold("Reason:")} ${reason}\n` +
        `  ${chalk.bold("Action:")} Reverted to ${chalk.green(expected)}\n`
    );
}

export function validateUpdateTasks(originalTasks, editedTasks) {
    const originalMap = Object.fromEntries(originalTasks.map(task => [task.id, task]));

    return editedTasks.map(task => {
        const original = originalMap[task.id];
        if (!original) return task;

        if (!["1", "2", "3"].includes(task.priority)) {
            logCorrection(
                task.id,
                "priority",
                original.priority,
                task.priority,
                "Priority must be a string between '1' and '3'."
            );
            task.priority = original.priority;
        }

        if (!["true", "false"].includes(task.completed)) {
            logCorrection(
                task.id,
                "completed",
                original.completed,
                task.completed,
                "Completed must be either 'true' or 'false'."
            );
            task.completed = original.completed;
        }

        if (!task.title || task.title.trim() === "") {
            logCorrection(
                task.id,
                "title",
                original.title,
                task.title,
                "Title must not be empty."
            );
            task.title = original.title;
        }

        if (!/^\d{4}-\d{2}-\d{2}$/.test(task.dueDate)) {
            logCorrection(
                task.id,
                "dueDate",
                original.dueDate,
                task.dueDate,
                "Due date must follow the format YYYY-MM-DD."
            );
            task.dueDate = original.dueDate;
        }

        return task;
    });
}

export function validateRemoveTasks(editedTasks) {
    return editedTasks.map(task => {
        if (!["true", "false"].includes(task.remove)) {
            logCorrection(
                task.id,
                "remove",
                false,
                task.remove,
                "Remove must be either 'true' or 'false'."
            );
        }

        return task;
    });
}

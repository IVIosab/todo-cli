import inquirer from 'inquirer';
import TableInput from 'inquirer-table-input';
import chalk from 'chalk';
import { postTasks } from '../db.js';
import { retreiveTasks } from './sort.js';

inquirer.registerPrompt("table-input", TableInput);

function parseEditedTasks(editedTasks) {
    return editedTasks
        .filter(task => task.remove !== "true")
        .map(({ remove, ...task }) => ({
            ...task,
            priority: Number(task.priority),
            completed: task.completed === "true"
        }));
}

function validateTasks(originalTasks, editedTasks) {
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

export async function removeTasksPrompt() {
    const tasks = await retreiveTasks();

    const columns = [
        { name: chalk.cyan.bold("id"), value: "id" },
        { name: chalk.cyan.bold("Title"), value: "title" },
        { name: chalk.cyan.bold("Description"), value: "description" },
        { name: chalk.cyan.bold("Due date"), value: "dueDate" },
        { name: chalk.cyan.bold("Created at"), value: "createdAt" },
        { name: chalk.cyan.bold("Priority"), value: "priority" },
        { name: chalk.cyan.bold("Completed"), value: "completed" },
        { name: chalk.cyan.bold("Remove?"), value: "remove", editable: "text" },
    ];

    const answers = await inquirer.prompt([
        {
            type: "table-input",
            name: "Tasks",
            message: "TASKS",
            infoMessage: "Select items to remove by updating the 'Remove?' column",
            hideInfoWhenKeyPressed: true,
            freezeColumns: 7,
            selectedColor: chalk.yellow,
            editableColor: chalk.bgYellow.bold,
            editingColor: chalk.bgGreen.bold,
            columns,
            rows: tasks.map(task => [...Object.values(task), false]),
            validate: () => false
        }
    ]);

    const validated = validateTasks(tasks, answers.Tasks.result);
    const parsed = parseEditedTasks(validated);
    await postTasks(parsed);
}

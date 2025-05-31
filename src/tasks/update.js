import inquirer from 'inquirer';
import TableInput from 'inquirer-table-input';
import chalk from 'chalk';
import { postTasks } from '../db.js';
import { retreiveTasks } from './sort.js';

inquirer.registerPrompt("table-input", TableInput);

function validateTasks(originalTasks, editedTasks) {
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


function parseEditedTasks(editedTasks) {
    return editedTasks.map(task => ({
        ...task,
        priority: Number(task.priority),
        completed: task.completed === "true"
    }));
}

export async function updateTasksPrompt() {
    const tasks = await retreiveTasks();

    const columns = [
        { name: chalk.cyan.bold("id"), value: "id" },
        { name: chalk.cyan.bold("Title"), value: "title", editable: "text" },
        { name: chalk.cyan.bold("Description"), value: "description", editable: "text" },
        { name: chalk.cyan.bold("Due date"), value: "dueDate", editable: "text" },
        { name: chalk.cyan.bold("Created at"), value: "createdAt" },
        { name: chalk.cyan.bold("Priority"), value: "priority", editable: "number" },
        { name: chalk.cyan.bold("Completed"), value: "completed", editable: "text" },
    ];

    const answers = await inquirer.prompt([
        {
            type: "table-input",
            name: "Tasks",
            message: "TASKS",
            infoMessage: "Navigate and update cells",
            hideInfoWhenKeyPressed: true,
            freezeColumns: 1,
            selectedColor: chalk.yellow,
            editableColor: chalk.bgYellow.bold,
            editingColor: chalk.bgGreen.bold,
            columns,
            rows: tasks.map(Object.values),
            validate: () => false
        }
    ]);
    const validated = validateTasks(tasks, answers.Tasks.result);
    const parsed = parseEditedTasks(validated);
    await postTasks(parsed);
}

import inquirer from 'inquirer';
import TableInput from 'inquirer-table-input';
import chalk from 'chalk';
import { retreiveTasks } from './sort.js';

inquirer.registerPrompt("table-input", TableInput);

export async function listTasksPrompt() {
    const tasks = await retreiveTasks();

    const columns = [
        { name: chalk.cyan.bold("id"), value: "id" },
        { name: chalk.cyan.bold("Title"), value: "title" },
        { name: chalk.cyan.bold("Description"), value: "description" },
        { name: chalk.cyan.bold("Due date"), value: "dueDate" },
        { name: chalk.cyan.bold("Created at"), value: "createdAt" },
        { name: chalk.cyan.bold("Priority"), value: "priority" },
        { name: chalk.cyan.bold("Completed"), value: "completed" },
    ];

    const answers = await inquirer.prompt([
        {
            type: "table-input",
            name: "Tasks",
            message: "TASKS",
            infoMessage: "",
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
}

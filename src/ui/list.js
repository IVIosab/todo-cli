import inquirer from 'inquirer';
import TableInput from 'inquirer-table-input';
import chalk from 'chalk';
import { listTasks } from '../utils/list.js';
import { postTasks } from '../db.js';

inquirer.registerPrompt("table-input", TableInput);

function parseEditedTasks(editedTasks) {
    return editedTasks.map(task => ({
        ...task,
        priority: Number(task.priority),
        completed: task.completed === "true"
    }));
}

export async function listTasksPrompt(info, edit) {
    const { sortMethod } = await inquirer.prompt([
        {
            type: 'list',
            name: 'sortMethod',
            message: 'How would you like the tasks to be sorted?',
            choices: [
                { name: '- Priority', value: 'priority' },
                { name: '- Due date', value: 'dueDate' },
                { name: '- Creation date', value: 'createdAt' },
                { name: '- Completion status', value: 'status' },
            ],
        },
    ]);

    const tasks = await listTasks(sortMethod);

    const columns = [
        { name: chalk.cyan.bold("id"), value: "id" },
        { name: chalk.cyan.bold("Title"), value: "title", ...(edit && { editable: "text" }) },
        { name: chalk.cyan.bold("Description"), value: "description", ...(edit && { editable: "text" }) },
        { name: chalk.cyan.bold("Due date"), value: "dueDate", ...(edit && { editable: "text" }) },
        { name: chalk.cyan.bold("Created at"), value: "createdAt" },
        { name: chalk.cyan.bold("Priority"), value: "priority", ...(edit && { editable: "number" }) },
        { name: chalk.cyan.bold("Completed"), value: "completed", ...(edit && { editable: "text" }) },
    ];

    const answers = await inquirer.prompt([
        {
            type: "table-input",
            name: "Tasks",
            message: "TASKS",
            infoMessage: info,
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

    if (edit) {
        const parsed = parseEditedTasks(answers.Tasks.result);
        await postTasks(parsed);
    }
}

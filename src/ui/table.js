import inquirer from 'inquirer';
import TableInput from 'inquirer-table-input';
import chalk from 'chalk';

inquirer.registerPrompt("table-input", TableInput);

export async function tablePrompt(tasks, info = '', edit = false, remove = false) {
    const columns = [
        { name: chalk.cyan.bold("id"), value: "id" },
        {
            name: chalk.cyan.bold("Title"),
            value: "title",
            ...(edit && { editable: "text" })
        },
        {
            name: chalk.cyan.bold("Description"),
            value: "description",
            ...(edit && { editable: "text" })
        },
        {
            name: chalk.cyan.bold("Due date"),
            value: "dueDate",
            ...(edit && { editable: "text" })
        },
        { name: chalk.cyan.bold("Created at"), value: "createdAt" },
        {
            name: chalk.cyan.bold("Priority"),
            value: "priority",
            ...(edit && { editable: "number" })
        },
        {
            name: chalk.cyan.bold("Completed"),
            value: "completed",
            ...(edit && { editable: "text" })
        }
    ];

    if (remove) {
        columns.push({
            name: chalk.red.bold("Remove"),
            value: "remove",
            editable: "text"
        });
    }

    const answers = await inquirer.prompt([
        {
            type: "table-input",
            name: "Tasks",
            message: "TASKS",
            infoMessage: info,
            hideInfoWhenKeyPressed: true,
            freezeColumns: remove ? 7 : 1,
            selectedColor: chalk.yellow,
            editableColor: chalk.bgYellow.bold,
            editingColor: chalk.bgGreen.bold,
            columns,
            rows: tasks.map(task => [
                ...Object.values(task),
                ...(remove ? [false] : [])
            ]),
            validate: () => false
        }
    ]);

    return answers;
}

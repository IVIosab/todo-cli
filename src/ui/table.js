import inquirer from 'inquirer';
import TableInput from 'inquirer-table-input';
import chalk from 'chalk';
import { z } from 'zod'

inquirer.registerPrompt("table-input", TableInput);

/**
 * Displays an interactive table prompt for managing tasks with optional editing and removal capabilities.
 * 
 * @param {Array} tasks - An array of task objects to be displayed in the table
 * @param {string} [info=''] - Optional informational message to display in the table
 * @param {boolean} [edit=false] - Flag to enable inline editing of task properties
 * @param {boolean} [remove=false] - Flag to enable task removal option
 * @returns {Promise<Object>} A promise resolving to the user's table input answers
 */
export async function tablePrompt(tasks, info = '', edit = false, remove = false) {
    const columns = [
        { name: chalk.cyan.bold("id"), value: "id" },
        {
            name: chalk.cyan.bold("Title"),
            value: "title",
            ...(edit && { editable: "text", validate: input => z.string().min(3).safeParse(input).success, message: "Enter a title with more than three characters" })
        },
        {
            name: chalk.cyan.bold("Description"),
            value: "description",
            ...(edit && { editable: "text", message: "Enter an optional description" })
        },
        {
            name: chalk.cyan.bold("Due date"),
            value: "dueDate",
            ...(edit && { editable: "text", validate: input => /\d{4}-\d{2}-\d{2}/.test(input), message: "Enter a date in the following format YYYY-MM-DD" })
        },
        { name: chalk.cyan.bold("Created at"), value: "createdAt" },
        {
            name: chalk.cyan.bold("Priority"),
            value: "priority",
            ...(edit && { editable: "choice", choices: ["High", "Medium", "Low"], validate: input => /^(High|Medium|Low)$/.test(input), message: "Use left and right arrow keys to change the value" })
        },
        {
            name: chalk.cyan.bold("Completed"),
            value: "completed",
            ...(edit && { editable: "boolean", validate: input => /^(true|false)$/.test(input), message: "Use left and right arrow keys to change the value" })
        }
    ];

    if (remove) {
        columns.push({
            name: chalk.red.bold("Remove"),
            value: "remove",
            editable: "boolean",
            validate: input => /^(true|false)$/.test(input),
            message: "Use left and right arrow keys to change the value"
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

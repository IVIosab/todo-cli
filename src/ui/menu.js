import inquirer from 'inquirer';
import TableInput from 'inquirer-table-input';
import chalk from 'chalk';

inquirer.registerPrompt("table-input", TableInput);

function parseEditedTasks(editedTasks) {
	return editedTasks.map(task => ({
		...task,
		priority: Number(task.priority),
		completed: task.completed === "true"
	}));
}

export async function mainMenuPrompt() {
	const { action } = await inquirer.prompt([
		{
			type: 'list',
			name: 'action',
			message: 'What would you like to do?',
			choices: [
				{ name: '- Add Task', value: 'add' },
				{ name: '- List Tasks', value: 'list' },
				{ name: '- Update Task', value: 'update' },
				{ name: '- Remove Task', value: 'remove' },
				{ name: '- Exit', value: 'exit' },
			],
		},
	]);

	return action;
}

export async function listTasksPrompt(tasks, info, edit) {
	const columns = [
		{ name: chalk.cyan.bold("id"), value: "id" },
		{ name: chalk.cyan.bold("Title"), value: "title", ...(edit && { editable: "text" }) },
		{ name: chalk.cyan.bold("Description"), value: "description", ...(edit && { editable: "text" }) },
		{ name: chalk.cyan.bold("Due date"), value: "dueDate", ...(edit && { editable: "text" }) },
		{ name: chalk.cyan.bold("Created at"), value: "createdAt" },
		{ name: chalk.cyan.bold("Priority"), value: "priority", ...(edit && { editable: "number" }) },
		{ name: chalk.cyan.bold("Completed"), value: "completed", ...(edit && { editable: "number" }) },
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

	const parsed = parseEditedTasks(answers.Tasks.result);
	return parsed;
}

export async function taskInputPrompt() {
	return inquirer.prompt([
		{
			type: 'input',
			name: 'title',
			message: 'Task title:',
			validate: input => input.trim().length >= 3 || 'Title must be at least 3 characters',
		},
		{
			type: 'input',
			name: 'description',
			message: 'Description (optional):',
		},
		{
			type: 'input',
			name: 'dueDate',
			message: 'Due date (YYYY-MM-DD):',
			validate: input => /\d{4}-\d{2}-\d{2}/.test(input) || 'Please use YYYY-MM-DD format',
		},
		{
			type: 'list',
			name: 'priority',
			message: 'Priority:',
			choices: [
				{ name: '1 (High)', value: 1 },
				{ name: '2 (Medium)', value: 2 },
				{ name: '3 (Low)', value: 3 },
			],
		},
	]);
}
import inquirer from 'inquirer';

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
				{ name: '- Mark Task as Completed', value: 'complete' },
				{ name: '- Remove Task', value: 'remove' },
				{ name: '- Exit', value: 'exit' },
			],
		},
	]);

	return action;
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
				{ name: '1 (High)', value: '1' },
				{ name: '2 (Medium)', value: '2' },
				{ name: '3 (Low)', value: '3' },
			],
		},
	]);
}
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
				{ name: '- Remove Task', value: 'remove' },
				{ name: '- Exit', value: 'exit' },
			],
		},
	]);

	return action;
}
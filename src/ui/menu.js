import inquirer from 'inquirer';

/**
 * Displays the main menu prompt and returns the selected action.
 * 
 * @returns {Promise<string>} A promise that resolves to the selected menu action 
 * ('add', 'list', 'update', 'remove', 'clear', or 'exit').
 */
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
				{ name: '- Clear all completed tasks', value: 'clear' },
				{ name: '- Exit', value: 'exit' },
			],
		},
	]);

	return action;
}
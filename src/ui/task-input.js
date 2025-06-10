import inquirer from 'inquirer';

export async function taskInputPrompt() {
    const task = await inquirer.prompt([
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
                { name: '1 (High)', value: "High" },
                { name: '2 (Medium)', value: "Medium" },
                { name: '3 (Low)', value: "Low" },
            ],
        },
    ]);

    return task;
}
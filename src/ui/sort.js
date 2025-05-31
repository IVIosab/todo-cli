import inquirer from 'inquirer';

export async function sortPrompt() {
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

    return sortMethod;
}

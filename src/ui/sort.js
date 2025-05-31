import inquirer from 'inquirer';
import { listTasks } from '../utils/list.js';

export async function retreiveTasks() {
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
    return tasks;
}

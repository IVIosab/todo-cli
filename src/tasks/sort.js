import inquirer from 'inquirer';
import { getTasks } from '../db.js'

async function listTasks(sortBy) {
    let tasks = await getTasks();
    switch (sortBy) {
        case 'priority':
            tasks = tasks.sort((a, b) => a.priority - b.priority)
            break
        case 'status':
            tasks = tasks.sort((a, b) => a.completed - b.completed)
            break
        case 'dueDate':
            tasks = tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
            break
        case 'createdAt':
        default:
            tasks = tasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            break
    }
    return tasks
}

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

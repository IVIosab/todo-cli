import inquirer from 'inquirer';
import { getTasks, postTasks } from '../db.js'
import { TaskSchema } from '../schema/task.js'
import { nanoid } from 'nanoid'
import dayjs from 'dayjs'

async function addTask(data) {
    const task = {
        id: nanoid(),
        title: data.title,
        description: data.description || '',
        dueDate: dayjs(data.dueDate).format('YYYY-MM-DD'),
        createdAt: dayjs().format('YYYY-MM-DD'),
        priority: data.priority,
        completed: false,
    }
    const parseResult = TaskSchema.safeParse(task)
    if (!parseResult.success) {
        throw new Error(`Invalid task data: ${JSON.stringify(parseResult.error.format())}`)
    }

    let tasks = await getTasks();
    const newTasks = [task, ...tasks];
    await postTasks(newTasks);
}


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
                { name: '1 (High)', value: 1 },
                { name: '2 (Medium)', value: 2 },
                { name: '3 (Low)', value: 3 },
            ],
        },
    ]);

    await addTask(task);
}
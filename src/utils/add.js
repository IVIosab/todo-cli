import { getTasks, postTasks } from '../db.js'
import { TaskSchema } from '../schema/task.js'
import { nanoid } from 'nanoid'
import dayjs from 'dayjs'

export async function addTask(data) {
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

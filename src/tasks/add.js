import db from '../db.js'
import { TaskSchema, PriorityEnum } from '../schema/index.js'
import { nanoid } from 'nanoid'
import dayjs from 'dayjs'

export async function addTask(data) {
    const task = {
        id: nanoid(),
        title: data.title,
        description: data.description || '',
        dueDate: dayjs(data.dueDate).format('YYYY-MM-DD'),
        createdAt: dayjs().format('YYYY-MM-DD'),
        priority: PriorityEnum.safeParse(data.priority).success ? data.priority : 3,
        completed: false,
    }
    const parseResult = TaskSchema.safeParse(task)
    if (!parseResult.success) {
        throw new Error(`Invalid task data: ${JSON.stringify(parseResult.error.format())}`)
    }

    await db.read();
    const tasks = db.data.tasks;
    db.data.tasks = [task, ...tasks];
    await db.write();
}

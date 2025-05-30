import db from '../db.js'
import { TaskSchema, PriorityEnum } from '../schema/index.js'
import dayjs from 'dayjs'

export async function updateTask() {
    throw new Error('Not Implemented');
    // await db.read();
    // let tasks = db.data.tasks;
    // const task = tasks.find(t => t.id === id);
    // if (!task) throw new Error(`Task with id ${id} not found`)

    // const updatedTask = {
    //     ...task,
    //     ...updates,
    // }

    // if (updates.dueDate) updatedTask.dueDate = dayjs(updates.dueDate).format('YYYY-MM-DD');
    // if (updates.priority && !PriorityEnum.safeParse(updates.priority).success) {
    //     updatedTask.priority = 3
    // }

    // const parseResult = TaskSchema.safeParse(updatedTask)
    // if (!parseResult.success) {
    //     throw new Error(`Invalid updated task data: ${JSON.stringify(parseResult.error.format())}`)
    // }

    // db.data.tasks.map(t => t.id === id ? updatedTask : t);

    // await db.write();
}

import db from '../db.js'
import { TaskSchema, PriorityEnum } from '../schema/index.js'
import dayjs from 'dayjs'

export async function updateTask(updatedTasks) {
    db.read();
    db.data.tasks = updatedTasks;
    db.write();
}

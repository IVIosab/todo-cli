import { postTasks } from '../db.js'

export async function updateTask(updatedTasks) {
    await postTasks(updatedTasks);
}

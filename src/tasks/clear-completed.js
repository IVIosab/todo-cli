import { getTasks, postTasks } from '../db.js';

/**
 * Retrieves all tasks, removes completed tasks, and updates the task list in the database.
 * 
 * @async
 * @returns {Promise<void>}
 */
export async function clearCompletedTasks() {
    const tasks = await getTasks();

    await postTasks(tasks
        .filter(task => task.completed !== true)
        .map((task) => ({
            ...task,
            completed: false
        })));
}

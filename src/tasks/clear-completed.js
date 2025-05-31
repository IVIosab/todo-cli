import { getTasks, postTasks } from '../db.js';

export async function clearCompletedTasks() {
    const tasks = await getTasks();

    await postTasks(tasks
        .filter(task => task.completed !== true)
        .map((task) => ({
            ...task,
            priority: Number(task.priority),
            completed: false
        })));
}

import { getTasks } from '../db.js'

export async function listTasks(sortBy = 'dueDate') {
    let tasks = await getTasks();
    switch (sortBy) {
        case 'priority':
            tasks = tasks.sort((a, b) => a.priority - b.priority)
            break
        case 'status':
            tasks = tasks.sort((a, b) => a.completed - b.completed)
            break
        case 'dueDate':
        default:
            tasks = tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
            break
    }
    return tasks
}

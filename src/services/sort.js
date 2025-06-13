import { getTasks } from '../db.js'

/**
 * Retrieves tasks from the database and sorts them based on a specified criteria.
 * 
 * @param {string} [sortBy='createdAt'] - The field to sort tasks by. 
 * Supports sorting by 'priority', 'status', 'dueDate', or 'createdAt' (default).
 * @returns {Promise<Array>} A promise that resolves to an array of sorted tasks.
 */
export async function retreiveSortedTasks(sortBy = 'createdAt') {
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
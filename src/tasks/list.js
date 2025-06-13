import { retreiveSortedTasks } from '../services/sort.js';
import { sortPrompt } from '../ui/sort.js';
import { tablePrompt } from '../ui/table.js';

/**
 * Lists tasks by prompting for sorting criteria, retrieving sorted tasks, and displaying them in a table.
 * 
 * @async
 * @returns {Promise<void>} A promise that resolves after displaying the sorted tasks.
 */
export async function listTasks() {
    const sortBy = await sortPrompt();
    const tasks = await retreiveSortedTasks(sortBy);
    await tablePrompt(tasks);
}

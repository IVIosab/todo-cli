import { postTasks } from '../db.js';
import { retreiveSortedTasks } from '../services/sort.js';
import { sortPrompt } from '../ui/sort.js';
import { tablePrompt } from '../ui/table.js';
import { parseUpdateTasks } from '../utils/parse.js';

/**
 * Updates tasks by prompting the user to sort and modify tasks.
 * 
 * This function performs the following steps:
 * 1. Prompts the user to select a sorting method
 * 2. Retrieves tasks sorted according to the selected method
 * 3. Displays tasks in a table for editing
 * 4. Parses the updated tasks
 * 5. Saves the updated tasks to the database
 * 
 * @async
 * @returns {Promise<void>}
 */
export async function updateTasks() {
    const sortBy = await sortPrompt();
    const tasks = await retreiveSortedTasks(sortBy);

    const answers = await tablePrompt(tasks, "Navigate and update cells", true);

    const parsed = parseUpdateTasks(answers.Tasks.result);

    await postTasks(parsed);
}

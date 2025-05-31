import { retreiveSortedTasks } from '../utils/sort.js';
import { sortPrompt } from '../ui/sort.js';

export async function retreiveTasks() {
    const sortBy = await sortPrompt();
    const tasks = await retreiveSortedTasks(sortBy);

    return tasks;
}

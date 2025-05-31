import { postTasks } from '../db.js';
import { retreiveSortedTasks } from '../utils/sort.js';
import { sortPrompt } from '../ui/sort.js';
import { tablePrompt } from '../ui/table.js';
import { parseRemoveTasks } from '../utils/parse.js';
import { validateRemoveTasks } from '../utils/validate.js';

export async function removeTasks() {
    const sortBy = await sortPrompt();
    const tasks = await retreiveSortedTasks(sortBy);

    const answers = await tablePrompt(tasks, "Select items to remove by updating the 'Remove?' column", false, true);

    const validated = validateRemoveTasks(tasks, answers.Tasks.result);
    const parsed = parseRemoveTasks(validated);
    
    await postTasks(parsed);
}

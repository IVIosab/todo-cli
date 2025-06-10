import { postTasks } from '../db.js';
import { retreiveSortedTasks } from '../utils/sort.js';
import { sortPrompt } from '../ui/sort.js';
import { tablePrompt } from '../ui/table.js';
import { validateUpdateTasks } from '../utils/validate.js';
import { parseUpdateTasks } from '../utils/parse.js';

export async function updateTasks() {
    const sortBy = await sortPrompt();
    const tasks = await retreiveSortedTasks(sortBy);

    const answers = await tablePrompt(tasks, "Navigate and update cells", true);

    const parsed = parseUpdateTasks(answers.Tasks.result);

    await postTasks(parsed);
}

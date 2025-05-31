import { postTasks } from '../db.js';
import { retreiveSortedTasks } from '../utils/sort.js';
import { sortPrompt } from '../ui/sort.js';
import { tablePrompt } from '../ui/table.js';

function parseEditedTasks(editedTasks) {
    return editedTasks
        .filter(task => task.remove !== "true")
        .map(({ remove, ...task }) => ({
            ...task,
            priority: Number(task.priority),
            completed: task.completed === "true"
        }));
}

function validateTasks(originalTasks, editedTasks) {
    const originalMap = Object.fromEntries(originalTasks.map(task => [task.id, task]));

    return editedTasks.map(task => {
        const original = originalMap[task.id];
        if (!original) return task;
        if (!["1", "2", "3"].includes(task.priority)) {
            task.priority = original.priority;
        }

        if (!["true", "false"].includes(task.remove)) {
            task.remove = original.remove;
        }

        return task;
    });
}

export async function removeTasks() {
    const sortBy = await sortPrompt();
    const tasks = await retreiveSortedTasks(sortBy);

    const answers = await tablePrompt(tasks, "Select items to remove by updating the 'Remove?' column", false, true);

    const validated = validateTasks(tasks, answers.Tasks.result);
    const parsed = parseEditedTasks(validated);
    await postTasks(parsed);
}

import { postTasks } from '../db.js';
import { retreiveSortedTasks } from '../utils/sort.js';
import { sortPrompt } from '../ui/sort.js';
import { tablePrompt } from '../ui/table.js';

function validateTasks(originalTasks, editedTasks) {
    const originalMap = Object.fromEntries(originalTasks.map(task => [task.id, task]));

    return editedTasks.map(task => {
        const original = originalMap[task.id];
        if (!original) return task;
        if (!["1", "2", "3"].includes(task.priority)) {
            task.priority = original.priority;
        }

        if (!["true", "false"].includes(task.completed)) {
            task.completed = original.completed;
        }

        if (!task.title || task.title.trim() === "") {
            task.title = original.title;
        }

        if (!/^\d{4}-\d{2}-\d{2}$/.test(task.dueDate)) {
            task.dueDate = original.dueDate;
        }

        return task;
    });
}


function parseEditedTasks(editedTasks) {
    return editedTasks.map(task => ({
        ...task,
        priority: Number(task.priority),
        completed: task.completed === "true"
    }));
}

export async function updateTasks() {
    const sortBy = await sortPrompt();
    const tasks = await retreiveSortedTasks(sortBy);

    const answers = await tablePrompt(tasks, "Navigate and update cells", true);

    const validated = validateTasks(tasks, answers.Tasks.result);
    const parsed = parseEditedTasks(validated);

    await postTasks(parsed);
}

import { listTasksPrompt, mainMenuPrompt, taskInputPrompt } from './ui/menu.js';
import { addTask } from './tasks/add.js';
import { listTasks } from './tasks/list.js';
import { updateTask } from './tasks/update.js';
import { removeTask } from './tasks/remove.js';
import figlet from 'figlet';

async function main() {
    console.log(await figlet("\\ @_@ /", "Weird"));
    while (true) {
        const action = await mainMenuPrompt();

        if (action === 'add') {
            const task = await taskInputPrompt();
            await addTask(task);
        } else if (action === 'list') {
            const tasks = await listTasks();
            await listTasksPrompt(tasks, "Navigate", false);
        } else if (action === 'update') {
            const tasks = await listTasks();
            const updatedTasks = await listTasksPrompt(tasks, "Navigate and Edit", true);
            await updateTask(updatedTasks);
        } else if (action === 'remove') {
            await removeTask();
        } else if (action === 'exit') {
            break;
        }
    }
}

main();

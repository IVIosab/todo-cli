import { mainMenuPrompt } from './ui/menu.js';
import { listTasks } from './tasks/list.js';
import { updateTasks } from './tasks/update.js';
import { removeTasks } from './tasks/remove.js';
import { addTask } from './tasks/add.js';
import { clearCompletedTasks } from './tasks/clear-completed.js';
import figlet from 'figlet';

async function main() {
    console.log(await figlet("\\ @_@ /", "Weird"));
    while (true) {
        const action = await mainMenuPrompt();

        if (action === 'add') {
            await addTask();
        } else if (action === 'list') {
            await listTasks();
        } else if (action === 'update') {
            await updateTasks();
        } else if (action === 'remove') {
            await removeTasks();
        } else if (action === 'clear') {
            await clearCompletedTasks();
        } else if (action === 'exit') {
            break;
        }
    }
}

main();

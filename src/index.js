import { mainMenuPrompt } from './tasks/menu.js';
import { listTasksPrompt } from './tasks/list.js';
import { updateTasksPrompt } from './tasks/update.js';
import { removeTasksPrompt } from './tasks/remove.js';
import { taskInputPrompt } from './tasks/add.js';
import { clearCompletedTasks } from './tasks/clear-completed.js';
import figlet from 'figlet';

async function main() {
    console.log(await figlet("\\ @_@ /", "Weird"));
    while (true) {
        const action = await mainMenuPrompt();

        if (action === 'add') {
            await taskInputPrompt();
        } else if (action === 'list') {
            await listTasksPrompt();
        } else if (action === 'update') {
            await updateTasksPrompt();
        } else if (action === 'remove') {
            await removeTasksPrompt();
        } else if (action === 'clear') {
            await clearCompletedTasks();
        } else if (action === 'exit') {
            break;
        }
    }
}

main();

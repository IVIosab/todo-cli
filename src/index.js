import { mainMenuPrompt } from './ui/menu.js';
import { listTasksPrompt } from './ui/list.js';
import { updateTasksPrompt } from './ui/update.js';
import { removeTasksPrompt } from './ui/remove.js';
import { taskInputPrompt } from './ui/add.js';
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
        } else if (action === 'exit') {
            break;
        }
    }
}

main();

import { mainMenuPrompt } from './ui/menu.js';
import { listTasksPrompt } from './ui/list.js';
import { taskInputPrompt } from './ui/add.js';
import { removeTask } from './utils/remove.js';
import figlet from 'figlet';

async function main() {
    console.log(await figlet("\\ @_@ /", "Weird"));
    while (true) {
        const action = await mainMenuPrompt();

        if (action === 'add') {
            await taskInputPrompt();
        } else if (action === 'list') {
            await listTasksPrompt("Navigate", false);
        } else if (action === 'update') {
            await listTasksPrompt("Navigate and Edit", true);
        } else if (action === 'remove') {
            await removeTask();
        } else if (action === 'exit') {
            break;
        }
    }
}

main();

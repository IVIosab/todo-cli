#!/usr/bin/env node

import { mainMenuPrompt, taskInputPrompt } from './ui/menu.js';
import { addTask } from './tasks/add.js';
import { listTasks } from './tasks/list.js';
import { updateTask } from './tasks/update.js';
import { removeTask } from './tasks/remove.js';
import { renderTasks } from './ui/render.js';

async function main() {
    while (true) {
        const action = await mainMenuPrompt();

        if (action === 'add') {
            const task = await taskInputPrompt();
            addTask(task);
        } else if (action === 'list') {
            const tasks = await listTasks();
            renderTasks(tasks);
        } else if (action === 'update') {
            await updateTask();
        } else if (action === 'remove') {
            await removeTask();
        } else if (action === 'exit') {
            break;
        }
    }
}

main();

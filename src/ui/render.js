import Table from 'cli-table3';
import chalk from 'chalk';
import dayjs from 'dayjs';

export function renderTasks(tasks) {
    if (!tasks.length) {
        console.log(chalk.gray('No tasks to display.'));
        return;
    }

    const table = new Table({
        head: ['ID', 'Title', 'Due', 'Priority', 'Status'],
        colWidths: [10, 30, 15, 10, 15],
        wordWrap: true,
    });

    tasks.forEach(task => {
        const status = task.completed ? chalk.green('✓ Done') : chalk.yellow('Pending');
        const due = dayjs(task.dueDate).format('MMM D, YYYY');
        const priorityMap = { '1': chalk.red('High'), '2': chalk.yellow('Medium'), '3': chalk.gray('Low') };

        table.push([
            chalk.cyan(task.id.slice(0, 6)),
            task.title,
            due,
            priorityMap[task.priority],
            status,
        ]);
    });

    console.log(table.toString());
}

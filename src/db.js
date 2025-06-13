import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync, existsSync } from 'fs';
import { oraPromise } from 'ora';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbFile = join(__dirname, '..', 'db.json');

if (!existsSync(dbFile)) {
    mkdirSync(dirname(dbFile), { recursive: true });
}

const adapter = new JSONFile(dbFile);
const db = new Low(adapter, {});

await db.read();
db.data ||= { tasks: [] };
await db.write();

/**
 * Retrieves all tasks from the database.
 * 
 * @returns {Promise<Array>} A promise that resolves to an array of tasks.
 */
export async function getTasks() {
    await oraPromise(db.read(), "Fetching data");
    return db.data.tasks;
}

/**
 * Replaces the existing tasks in the database with a new array of tasks.
 * 
 * @param {Array} tasks - The new array of tasks to be stored in the database.
 * @returns {Promise<void>} A promise that resolves when the tasks are written to the database.
 */
export async function postTasks(tasks) {
    db.data.tasks = tasks;
    await oraPromise(db.write(), "Writing data");
}

import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync, existsSync } from 'fs';

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

export default db;

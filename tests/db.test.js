import { describe, it, expect, beforeEach } from 'vitest';
import db from '../src/db.js';

const sampleTask = {
    id: 'test123',
    title: 'Sample Task',
    description: 'Just testing',
    dueDate: '2025-12-31',
    createdAt: '2025-01-01',
    priority: '2',
    completed: false,
};

describe('db.js', () => {
    beforeEach(async () => {
        await db.read();
        db.data.tasks = [];
        await db.write();
    });

    it('should initialize with a tasks array', async () => {
        await db.read();
        expect(Array.isArray(db.data.tasks)).toBe(true);
    });

    it('should add and persist a task', async () => {
        db.data.tasks.push(sampleTask);
        await db.write();

        await db.read();
        const task = db.data.tasks.find(t => t.id === sampleTask.id);
        expect(task).toBeDefined();
        expect(task.title).toBe('Sample Task');
    });

    it('should reset tasks between tests', async () => {
        await db.read();
        expect(db.data.tasks.length).toBe(0);
    });
});

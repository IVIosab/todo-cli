import { describe, it, expect, beforeEach } from 'vitest'
import db from '../../src/db.js'
import { addTask } from '@tasks/add.js'
import { listTasks } from '../../src/tasks/list.js'

describe('addTask', () => {
    beforeEach(async () => {
        await db.read()
        db.data = { tasks: [] }
        await db.write()
    })

    it('no tasks', async () => {
        const tasks = await listTasks();

        expect(tasks.length).toEqual(0);
    })

    it('contains tasks', async () => {
        const taskInput = {
            title: 'Test task',
            dueDate: '2025-12-31',
            priority: '2'
        }

        await addTask(taskInput)

        const tasks = await listTasks();
        expect(tasks.length).toBeGreaterThan(0);
    })
})

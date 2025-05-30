import { describe, it, expect, beforeEach } from 'vitest'
import db from '../../src/db.js'
import { addTask } from '@tasks/add.js'

describe('addTask', () => {
    beforeEach(async () => {
        await db.read()
        db.data = { tasks: [] }
        await db.write()
    })

    it('adds a valid task with generated id and timestamps', async () => {
        const taskInput = {
            title: 'Test task',
            dueDate: '2025-12-31',
            priority: '2'
        }

        await addTask(taskInput)
        await db.read();
        expect(db.data.tasks[0]).toHaveProperty('id')
        expect(db.data.tasks[0]).toHaveProperty('createdAt')
        expect(db.data.tasks[0].title).toBe(taskInput.title)
        expect(db.data.tasks[0].priority).toBe(taskInput.priority)
        expect(db.data.tasks[0].dueDate).toBe(taskInput.dueDate)
        expect(db.data.tasks[0].completed).toBe(false)
    })

    it('throws if task input is invalid', async () => {
        const invalidTask = {
            title: '',
            priority: 10,
            dueDate: 'invalid-date',
            completed: false,
        }

        await expect(addTask(invalidTask)).rejects.toThrow()
    })
})

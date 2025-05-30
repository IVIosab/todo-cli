import { describe, it, expect, vi } from 'vitest';
import { renderTasks } from '@ui/render.js';

describe('renderTasks', () => {
    it('should log a table when given tasks', () => {
        const spy = vi.spyOn(console, 'log').mockImplementation(() => { });
        const tasks = [{
            id: 'abc123',
            title: 'Test task',
            dueDate: '2025-06-01',
            priority: '1',
            completed: false,
        }];
        renderTasks(tasks);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });

    it('should log a message for empty list', () => {
        const spy = vi.spyOn(console, 'log').mockImplementation(() => { });
        renderTasks([]);
        expect(spy).toHaveBeenCalledWith(expect.stringContaining('No tasks'));
        spy.mockRestore();
    });
});

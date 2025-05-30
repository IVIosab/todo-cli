import { describe, it, expect } from 'vitest';
import { TaskSchema } from '@schema/task';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

describe('TaskSchema validation', () => {
    const validTask = {
        id: nanoid(),
        title: 'Write unit tests',
        description: 'Basic schema tests',
        dueDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
        createdAt: dayjs().format('YYYY-MM-DD'),
        priority: '1',
        completed: false,
    };

    it('accepts a valid task object', () => {
        const result = TaskSchema.safeParse(validTask);
        expect(result.success).toBe(true);
    });

    it('fails if title is missing', () => {
        const { title, ...partial } = validTask;
        const result = TaskSchema.safeParse(partial);
        expect(result.success).toBe(false);
    });

    it('fails if dueDate is invalid', () => {
        const result = TaskSchema.safeParse({
            ...validTask,
            dueDate: 'not-a-date',
        });
        expect(result.success).toBe(false);
    });

    it('fails if priority is not 1, 2 or 3', () => {
        const result = TaskSchema.safeParse({
            ...validTask,
            priority: '5',
        });
        expect(result.success).toBe(false);
    });

    it('defaults description to empty string if omitted', () => {
        const { description, ...taskWithoutDesc } = validTask;
        const result = TaskSchema.safeParse(taskWithoutDesc);
        expect(result.success).toBe(true);
        expect(result.data.description).toBe('');
    });
});

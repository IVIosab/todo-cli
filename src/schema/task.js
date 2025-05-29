import { z } from 'zod';
import dayjs from 'dayjs';

export const PriorityEnum = z.enum(['1', '2', '3']);

const dayjsString = (fieldName = 'date') =>
    z.string().refine((val) => dayjs(val, 'YYYY-MM-DD', true).isValid(), {
        message: `Invalid ${fieldName} format (expected YYYY-MM-DD)`,
    });

export const TaskSchema = z.object({
    id: z.string(),
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional().default(''),
    dueDate: dayjsString('dueDate'),
    createdAt: dayjsString('createdAt'),
    priority: PriorityEnum,
    completed: z.boolean(),
});

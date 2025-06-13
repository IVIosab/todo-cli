
import { z } from 'zod';
import dayjs from 'dayjs';

/**
 * Validates a date string in the format 'YYYY-MM-DD'.
 * 
 * @param {string} [fieldName='date'] - The name of the date field being validated.
 * @returns {ZodType} A Zod schema that validates date strings.
 */
const dayjsString = (fieldName = 'date') =>
    z.string().refine((val) => dayjs(val, 'YYYY-MM-DD', true).isValid(), {
        message: `Invalid ${fieldName} format (expected YYYY-MM-DD)`,
    });


/**
 * Schema for defining a task with validation rules.
 * 
 * @typedef {Object} TaskSchema
 * @property {string} id - Unique identifier for the task.
 * @property {string} title - Task title (required, minimum length 1).
 * @property {string} [description=' '] - Optional task description.
 * @property {string} dueDate - Task due date in 'YYYY-MM-DD' format.
 * @property {string} createdAt - Task creation date in 'YYYY-MM-DD' format.
 * @property {string} [priority='Low'] - Task priority (High, Medium, or Low).
 * @property {boolean} completed - Indicates whether the task is completed.
 */
export const TaskSchema = z.object({
    id: z.string(),
    title: z.string().min(3, 'Title is required'),
    description: z.string().optional().default(' '),
    dueDate: dayjsString('dueDate'),
    createdAt: dayjsString('createdAt'),
    priority: z.string().regex(/^(High|Medium|Low)$/).default("Low"),
    completed: z.boolean(),
});

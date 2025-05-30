import { describe, it, expect, vi, beforeEach } from 'vitest';
import inquirer from 'inquirer';
import { mainMenuPrompt } from '@ui/menu.js';

vi.mock('inquirer', () => {
    const actual = vi.importActual('inquirer');
    return {
        default: {
            ...actual,
            prompt: vi.fn(),
            Separator: actual.Separator,
        },
    };
});

describe('mainMenuPrompt', () => {
    beforeEach(() => {
        inquirer.prompt.mockReset();
    });

    it('returns user action', async () => {
        inquirer.prompt.mockResolvedValue({ action: 'add' });
        const result = await mainMenuPrompt();
        expect(result).toBe('add');
    });
});

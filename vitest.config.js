import { defineConfig } from 'vitest/config';

export default defineConfig({
    resolve: {
        alias: {
            '@schema': '/src/schema',
            '@tasks': '/src/tasks',
            '@utils': '/src/utils',
            '@ui': '/src/ui',
        },
    },
});

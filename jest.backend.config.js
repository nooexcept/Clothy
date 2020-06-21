module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/backend/**/*.test.(ts|tsx)'],
    moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
    collectCoverageFrom: [
        '**/*.{js,ts,tsx}',
        '!**/*.d.ts',
        '!src/theme.ts',
        '!src/types.ts',
        '!**/coverage/**',
        '!**/node_modules/**',
        '!**/jest*.js',
    ],
    testPathIgnorePatterns: ['/node_modules/', '/.next/'],
    transform: {
        '^.+\\.(js|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    },
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
    moduleNameMapper: {
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    },
}

module.exports = {
    moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
    testMatch: ['**/frontend/**/*.test.(ts|tsx)', '**/tests/*.test.(ts|tsx)'],
    collectCoverageFrom: [
        '**/*.{js,ts,tsx}',
        '!**/*.d.ts',
        '!src/theme.ts',
        '!src/types.ts',
        '!**/coverage/**',
        '!**/node_modules/**',
        '!**/jest*.js',
    ],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    testPathIgnorePatterns: ['/node_modules/', '/.next/'],
    transform: {
        '^.+\\.(js|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    },
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
    moduleNameMapper: {
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    },
    snapshotSerializers: ['enzyme-to-json/serializer'],
}

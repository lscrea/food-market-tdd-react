/** @type {import('jest').Config} */
module.exports = {
  clearMocks: true,
  coverageProvider: 'v8',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'mjs'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testEnvironment: 'jest-fixed-jsdom',
  testEnvironmentOptions: { customExportConditions: [''] },
  testMatch: ['<rootDir>/src/**/*.test.(ts|tsx)'],
  transform: {
    '^.+\\.(ts|tsx|mjs|js)$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.test.json' }]
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(msw|@mswjs|@bundled-es-modules|@open-draft|until-async|outvariant|strict-event-emitter|headers-polyfill|rettime|@inquirer)/)'
  ],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy'
  }
};

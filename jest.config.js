/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  projects: [
    {
      displayName: 'src',
      testMatch: ['<rootDir>/src/**/*.test.ts'],
      preset: 'ts-jest',
      testEnvironment: 'node'
    }
  ]
};

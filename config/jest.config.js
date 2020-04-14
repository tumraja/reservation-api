module.exports = {
  preset: 'ts-jest',
  rootDir: ['<rootDir>/config'],
  roots: ['<rootDir>/test'],
  testEnvironment: 'node',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(spec))\\.tsx?$',
};
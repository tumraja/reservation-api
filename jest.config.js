module.exports = {
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json"
    }
  },
  preset: 'ts-jest',
  rootDir: ['<rootDir>/config'],
  roots: ['<rootDir>/test'],
  testEnvironment: 'node',
  moduleFileExtensions: ['ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__test__/.*|(\\.|/)(spec))\\.ts?$',
};

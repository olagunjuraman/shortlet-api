import type { Config } from '@jest/types';
const config: Config.InitialOptions = {
preset: 'ts-jest',
testEnvironment: 'node',
testPathIgnorePatterns: ['/node_modules/', '/dist/'],
setupFilesAfterEnv: ['./jest.setup.ts'],
moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
export default config;


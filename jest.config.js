module.exports = {
    preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
    testMatch: [
        '**/?(*.)(spec|test).ts?(x)'
    ],
    verbose: true,
    collectCoverage: true,
    coverageReporters: [
        'html',
        'text-summary'
    ],
    setupFilesAfterEnv: ['<rootDir>/tests/unit/vueBuefy.js']
};

module.exports = {
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    globalSetup: '<rootDir>/src/test/global.setup.js',
};

process.env = Object.assign(process.env, {
    DB_URL: 'postgresql://localhost',
    NODE_ENV: 'testing'
});

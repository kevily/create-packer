module.exports = {
    roots: ['<rootDir>/test'],
    testRegex: 'test/(.+)\\.test\\.(jsx?|tsx?)$',
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    moduleFileExtensions: ['ts', 'js', 'json', 'node']
}

module.exports = {
    roots: ['<rootDir>/src'],
    testRegex: 'src/(.+)\\.test\\.(jsx?|tsx?)$',
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
}

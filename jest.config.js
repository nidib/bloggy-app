/** @type {import('jest').Config} */
module.exports = {
	preset: 'react-native',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	transformIgnorePatterns: [
		'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|@ui-kitten|react-navigation|@react-navigation/.|react-native-svg)',
	],
};

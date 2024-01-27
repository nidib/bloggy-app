module.exports = {
	plugins: ['@trivago/prettier-plugin-sort-imports'],
	singleQuote: true,
	semi: true,
	trailingComma: 'es5',
	bracketSpacing: true,
	arrowParens: 'avoid',
	printWidth: 120,
	importOrder: ['^(react|react-native)$', '<THIRD_PARTY_MODULES>', '^[./]'],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
	importOrderGroupNamespaceSpecifiers: true,
};

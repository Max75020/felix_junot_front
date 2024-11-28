module.exports = {
	collectCoverageFrom: ['src/**/*.{js,jsx}'],
	coverageDirectory: 'coverage',
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['./jest.setup.js'],
	transform: {
		'^.+\\.[jt]sx?$': 'babel-jest',
	},
	moduleNameMapper: {
		'\\.(css|less|scss|sass|png|jpg|jpeg|gif|svg|woff|woff2)$': 'identity-obj-proxy',
	},
};

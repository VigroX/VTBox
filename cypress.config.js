import { defineConfig } from 'cypress'

export default defineConfig({
	fixturesFolder: false,
	e2e: {
		specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
		baseUrl: 'http://localhost:4173',
		video: false
	},
	component: {
		specPattern: 'src/**/__tests__/*.{cy,spec}.{js,ts,jsx,tsx}',
		devServer: {
			framework: 'vue',
			bundler: 'vite'
		},
		video: false
	}
})

import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),

		// https://github.com/jpkleemans/vite-svg-loader
		svgLoader({
			defaultExport: 'component',
			svgoConfig: {
				plugins: [
					'preset-default',
					{ name: 'removeDimensions', active: false },
				],
			},
		}),

		// https://github.com/hannoeru/vite-plugin-pages
		Pages({
			moduleId: 'virtual:generated-pages',
		}),

		// https://github.com/antfu/unplugin-auto-import
		AutoImport({
			imports: [
				'vue',
				'vue-router',
				'@vueuse/core',
			],
			dts: 'types/auto-imports.d.ts',
			dirs: [
				'src/composables',
				'src/stores',
				'src/utils'
			],
			vueTemplate: true,
		}),

		// https://github.com/antfu/unplugin-vue-components
		Components({
			extensions: ['vue', 'svg'],
			importPathTransform: path => path.endsWith('.svg') ? `${path}?component` : undefined,
			dts: 'types/components.d.ts',
			directoryAsNamespace: true,
		})
	],
	resolve: {
		alias: [
			{ find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }
		]
	},
	css: {
		modules: {
			generateScopedName: '[local]_[hash:base64:6]',
		}
	}
})

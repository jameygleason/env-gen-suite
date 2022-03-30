import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import envGen from '@signalchain/rollup-plugin-env-gen';

const mode = process.env.NODE_ENV;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),

		// Override http methods in the Todo forms
		methodOverride: {
			allowed: ['PATCH', 'DELETE']
		},
		vite: () => ({
			plugins: [
				envGen({
					mode
				})
			]
		})
	}
};

export default config;

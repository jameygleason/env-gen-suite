import preprocess from "svelte-preprocess"
import envGen from "@signalchain/rollup-plugin-env-gen" // eslint-disable-line import/no-unresolved

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",
    /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
    vite: () => ({
      plugins: [envGen()],
    }),
  },
}

export default config

<svelte:head>
  <title>Env Gen - Svelte Kit</title>
</svelte:head>

<pre>
  {JSON.stringify(process.env, null, 2)}
</pre>

<style>
  pre {
    font-size: 24px;
  }
</style>

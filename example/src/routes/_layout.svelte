<script>
  import Nav from '../components/Nav.svelte'
  // export let segment

  // if (segment) {
  //   // noop
  // }
</script>

<Nav />

<slot />

<style lang="scss" global>
  @import './src/styles/index.scss';
</style>

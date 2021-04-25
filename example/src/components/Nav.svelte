<script>
  import themeSwitch from '../styles/generated/themeSwitch.js'

  let num = 1

  function switchTheme() {
    num += 1
    if (num > 5) num = 1
    if (num === 1) themeSwitch('main')
    if (num === 2) themeSwitch('dark')
    if (num === 3) themeSwitch('blue')
    if (num === 4) themeSwitch('purple')
    if (num === 5) themeSwitch('red')
  }

  export let segment
</script>

<nav>
  <ul>
    <li>
      <a class='{segment === undefined ? "selected" : ""}' href=".">home</a>
    </li>
    <li>
      <a class='{segment === "about" ? "selected" : ""}' href="about">about</a>
    </li>

    <!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
    <li>
      <a
        rel="prefetch"
        class='{segment === "blog" ? "selected" : ""}'
        href="blog"
        >blog</a
      >
    </li>
  </ul>

  <button on:click="{switchTheme}">
    Switch Theme
  </button>
</nav>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    font-weight: 300;
    padding: 0 1em;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: '';
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  .selected {
    position: relative;
    display: inline-block;
  }

  .selected::after {
    position: absolute;
    content: '';
    width: calc(100% - 1em);
    height: 2px;
    background-color: var(--bg_i);
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }

  button {
    display: inline-block;
    text-align: right;
    background-color: var(--bg_i);
    padding: 0.5em 1.8em 0.5em 1em;
    border-radius: 2px;
    color: var(--text_i);
    position: relative;
    border: none;
    box-shadow: none;
  }
</style>

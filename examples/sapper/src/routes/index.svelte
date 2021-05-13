<svelte:head>
  <title>Theme Engine</title>
</svelte:head>

<section>
  <h1>Base Styles</h1>
</section>

<section>
  <h2>Headings</h2>
  <p>&lt;h1&gt;, &lt;h2&gt;, &lt;h3&gt;, &lt;h4&gt;, &lt;h5&gt;, &lt;h6&gt;,</p>
  <h1 class="xxl">Heading XXL</h1>
  <h1>Heading 1</h1>
  <h2>Heading 2</h2>
  <h3>Heading 3</h3>
  <h4>Heading 4</h4>
  <h5>Heading 5</h5>
  <h6>Heading 6</h6>
</section>

<hr />

<section>
  <h2>Text Content</h2>
  <p>
    &lt;p&gt;, &lt;a&gt;, &lt;em&gt;, &lt;strong&gt;, &lt;small&gt;,
    &lt;blockquote&gt;, &lt;abbr&gt;, &lt;pre&gt;, &lt;code&gt;, &lt;sub&gt;,
    &lt;sup&gt;
  </p>
  <p>
    Lorem
    <a href="#home">ipsum</a>
    dolor sit amet, consectetur adipisicing elit. Ipsum ipsam a neque officiis eaque
    impedit eligendi sapiente in, assumenda sint voluptatem doloribus nulla delectus
    consequatur tenetur error corporis natus reiciendis! End of the paragraph.
  </p>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum ipsam a
    neque officiis eaque impedit eligendi sapiente in, assumenda sint voluptatem
    doloribus nulla delectus consequatur tenetur error corporis natus
    reiciendis! End of the paragraph.
  </p>

  <blockquote cite="http://www.worldwildlife.org/who/index.html">
    For 50 years, WWF has been protecting the future of nature. The world's
    leading conservation organization, WWF works in 100 countries and is
    supported by 1.2 million members in the United States and close to 5 million
    globally.
  </blockquote>

  <p>
    <em>Lorem ipsum dolor sit</em>, amet consectetur adipisicing elit. Quas
    soluta est eaque quisquam deserunt ab. Corporis, minus porro quibusdam
    voluptatem eos veniam quisquam,
    <strong>saepe animi molestiae ad, expedita quod dolor!</strong>
    End of the paragraph.
  </p>

  <p>
    The
    <abbr title="World Health Organization">WHO</abbr>
    was founded in 1948. End of the paragraph.
  </p>

  <p>4<sub>2</sub></p>
  <p>4<sup>2</sup></p>
  <p><small>Hi I'm small</small></p>

  <pre>
    <code class="language-javascript">
    {`
function() {
  console.log('Hello world!')
}
    `}
  </code>
</pre>

  <code />
</section>

<hr />

<section>
  <h2>Forms</h2>

  <form>
    <fieldset>
      <legend>
        <h3>My Form</h3>
      </legend>
      <label for=""><span>Text</span><input type="text" /></label>
      <label for=""><span>Number</span><input type="number" /></label>
      <label for=""><span>Email</span><input type="email" /></label>
      <label for=""><span>Password</span><input type="password" /></label>
      <label for=""><span>File</span><input type="file" /></label>
      <label for=""><span>Radio</span><input type="radio" /></label>
      <label for=""><span>Checkbox</span> <input type="checkbox" /> </label>
      <label for=""><span>Range</span><input type="range" /></label>
      <label for=""><span>Tel</span><input type="tel" /></label>
      <label for=""><span>Search</span><input type="search" /></label>
      <label for=""><span>Date</span><input type="date" /></label>
      <label for=""
        ><span>Date Time Local</span><input type="datetime-local" /></label
      >
      <label for=""><span>Time</span><input type="time" /></label>
      <label for=""><span>Week</span><input type="week" /></label>
      <label for=""><span>Month</span><input type="month" /></label>
      <label for=""><span>URL</span><input type="url" /></label>
      <select name="" id="" />
      <textarea />
      <button>Submit</button>
    </fieldset>
  </form>
</section>

<hr />

<section>
  <h2>Containers</h2>
  <p>
    &lt;section&gt;, &lt;div&gt;, &lt;span&gt;, &lt;header&gt;, &lt;footer&gt;,
    &lt;main&gt;, &lt;article&gt;, &lt;aside&gt;, &lt;dialog&gt;,
    &lt;address&gt;
  </p>
</section>

<section>
  <h2>Component Materials</h2>
  <div class="card">
    <h3>This is a card</h3>
    <p>It handles background, box-shadow, and border-radius</p>
  </div>
</section>

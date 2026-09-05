# Optional HTML report

Use when an HTML architecture report is requested. Save a self-contained file to
the requested location or the OS temporary directory and provide its absolute path.
Use inline CSS and SVG so the report remains readable offline. Verify the rendered
result using the available browser tools.

Show supported findings with affected paths, the observed difficulty, a concrete
proposal, and the tradeoff. A before/after diagram helps when it explains a real
structural change. Omit speculative candidates and say when no change is warranted.
Use the repository's ordinary technical and domain vocabulary.

A minimal starting point:

```html
<!doctype html>
<html lang="en">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Architecture review</title>
<style>
  body { font: 1rem/1.6 system-ui; max-width: 64rem; margin: auto; padding: 2rem; }
  article { border-top: 1px solid #ccc; padding-block: 1rem; }
  svg { max-width: 100%; height: auto; }
</style>
<main>
  <h1>Architecture review</h1>
  <p>Scope and evidence.</p>
  <article>
    <h2>Supported finding</h2>
    <p>Affected paths, concrete problem, proposal, and tradeoff.</p>
  </article>
</main>
</html>
```

Keep design criteria in the codebase-design skill. The report format does not
justify extra adapters, test deletion, an interview, or implementation.

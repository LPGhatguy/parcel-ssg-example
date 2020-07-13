# Parcel Static Site Generator Example
An example of using Parcel to create a true statically rendered website.

This example uses React, but it's easy to adapt this same idea to any other UI library.

The generator code, [`generator.js`](generator.js) is intended to be simple and starightforward to adapt to your own projects.

## Key Features
* Generates HTML that does not require JS to function.
* Supports live-reloading with Parcel during development.
* Dynamically generates set of pages by crawling rendered links.

## Usage
Install dependencies:

```bash
npm install
```

To run in development mode:

```bash
npm run dev
```

To build to the `dist/` directory:

```bash
npm run build
```

## How it Works
This example is driven by a simple static site generator, contained in `generator.js`. It loads the site's React components and renders them to static HTML.

We cannot run `generator.js` directly though, since our React components import CSS and image files. Parcel will handle these and generate bundles correctly, but Node.js cannot do this¹.

What we do instead is use Parcel to bundle `generator.js` (using the Node.js target). We can run the resulting generated file and use that to generate our site instead.

We rely on Parcel's asset naming scheme being deterministic for this to work. If the Parcel-built generator and the Parcel-built client code disagree on what an asset should be named, it will manifest as a React error trying to hydrate the page!

* 1: It might be possible to exfiltrate bundle data from Parcel and then use something like `node-hook` to hook `require`. I tried to do this originally, but ran into lots of issues.

## License
Available under the MIT license. See [LICENSE.txt](LICENSE.txt) or <https://opensource.org/licenses/MIT> for details.
# Blumen

> A blog starter theme for [Gridsome](https://gridsome.org) on the [Ghost JAMstack](https://ghost.org/blog/jamstack/), inspired by [Bleda](https://gridsome.org/starters/bleda/) and [Lumen](https://www.gatsbyjs.org/starters/alxshelepenok/gatsby-starter-lumen/).

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/emilol/gridsome-starter-blumen)

## Demo

- [Page](https://gridsome-starter-blumen.netlify.com/page/about/)
- [Single post](https://gridsome-starter-blumen.netlify.com/getting-started)
- [Blog archive](https://gridsome-starter-blumen.netlify.com/)
- [Tags archive](https://gridsome-starter-blumen.netlify.com/tag/getting-started/)
- [Author archive](https://gridsome-starter-blumen.netlify.com/author/ghost/)

## Features

- Sitemap
- RSS Feed
- Google Analytics
- Custom 404 Page
- Open Graph meta tags
- Code syntax highlighting
- Taxonomies: Tags and Authors
- Aproximate read time for posts
- Post excerpts: automatic or user-defined
- **Paginated** [blog](https://gridsome-starter-blumen.netlify.com/2/), [tag](https://gridsome-starter-blumen.netlify.com/tag/getting-started/), and [author](https://gridsome-starter-blumen.netlify.com/author/ghost/) archives
- Easily show post dates in your locale (moment.js)
- Posts show a warning if they're older than 1 year (configurable)

## Installation

It's recommended that you install Blumen with the `gridsome create` command, so that Gridsome removes the `.git` folder and installs NPM dependencies for you:

```sh
gridsome create my-website https://github.com/emilol/gridsome-starter-blumen.git
```

Alternatively, you can clone this repo and set it up manually:

```sh
git clone https://github.com/emilol/gridsome-starter-blumen.git my-website

# navigate to the directory
cd my-website

# remove the Git folder
rm -rf .git

# install NPM dependencies
npm install
```

## Configuration

See the [configuration notes](https://gridsome-starter-blumen.netlify.com/getting-started/#configuration) in the Getting Started demo post.

## Development

Run `gridsome develop` to start a local development server, or `gridsome build` to build the static site into the `dist` folder.

See the [Gridsome docs](https://gridsome.org/docs) for more information.

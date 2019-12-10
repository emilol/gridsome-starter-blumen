class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

const config = {
  siteName: 'Ghost & Gridsome',
  siteDescription: "Thoughts, stories and JAMstack",
  siteUrl: 'https://gridsome-starter-blumen.netlify.com',
}

const ghostConfig = require('./ghost-config')();

module.exports = {
  ...config,
  titleTemplate: `%s`,
  icon: 'static/favicon.png',

  templates: {
    GhostPost: '/:slug',
    GhostPage: '/page/:slug',
    GhostTag: '/tag/:slug',
    GhostAuthor: '/author/:slug'
  },

  plugins: [
    {
      use: '@gridsome/source-ghost',
      options: ghostConfig,
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-135446199-1'
      }
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        cacheTime: 600000, // default
      }
    },
    {
      use: 'gridsome-plugin-rss',
      options: {
        contentTypeName: 'GhostPost',
        feedOptions: {
          title: config.siteName,
          description: config.siteDescription,
          feed_url: `${config.siteUrl}/rss/`,
          site_url: config.siteUrl,
          image_url: `${config.siteUrl}/favicon.png`,
          custom_namespaces: {
            'media': 'http://search.yahoo.com/mrss/'
          },
          ttl: 60,
        },
        feedItemOptions: node => ({
          guid: node.id,
          title: node.title,
          description: node.excerpt,
          url: `${config.siteUrl}/${node.slug}/`,
          date: node.published_at,
          custom_elements: [
            { 'dc:creator': node.primary_author.name },
            { 'media:content': node.feature_image },
            { 'content:encoded': node.html },
          ],
        }),
        output: {
          dir: './static',
          name: 'feed.xml'
        }
      }
    },
  ],

  chainWebpack: config => {

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')

    config.module
      .rule('css')
      .oneOf('normal')
      .use('postcss-loader')
      .tap(options => {
        options.plugins.unshift(...[
          require('postcss-import'),
          require('postcss-nested'),
          require('tailwindcss'),
        ])

        if (process.env.NODE_ENV === 'production') {
          options.plugins.push(...[
            require('@fullhuman/postcss-purgecss')({
              content: [
                'src/assets/**/*.css',
                'src/**/*.vue',
                'src/**/*.js'
              ],
              extractors: [
                {
                  extractor: TailwindExtractor,
                  extensions: ['css', 'vue', 'js']
                }
              ],
              whitelistPatterns: [/shiki/]
            }),
          ])
        }

        return options
      })
  }
}






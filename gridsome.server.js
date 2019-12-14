// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const GhostSettings = require('./plugins/ghost-settings');

module.exports = function (api) {
  api.loadSource(({ addCollection }) => {
    // Use the Data store API here: https://gridsome.org/docs/data-store-api/
  })

  api.configureServer(app => {
    app.get('/rss', (req, res) => {
      res.redirect(301, '../feed.xml')
    })
  })

  api.loadSource(async store => {
    store.addMetadata('disqusShortName', '')
  })

  var settings = new GhostSettings(api);
}

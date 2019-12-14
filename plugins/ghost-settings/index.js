const GhostContentAPI = require('@tryghost/content-api');
const getConfig = require('../../ghost-config');
const schema = require('./ghost-schema');

class GhostSettings {
  constructor (api, options) {
    this.api = api
    options = options || getConfig()
    this.restBases = { posts: {}, taxonomies: {}}

    this.contentAPI = new GhostContentAPI({
      url: options.baseUrl,
      key: options.contentKey,
      version: options.version
    })

    api.createSchema(({ addSchemaTypes, addSchemaResolvers }) => {
      addSchemaTypes(schema.GhostSettings({
        settings: 'GhostSettings',
        navigation: 'GhostNavigation'
      }))

      addSchemaResolvers({
        GhostSettings: {
          navigation(obj) { return obj.navigation }
        }
      })
    })

    api.loadSource(async store => {
      console.log(`Loading settings from ${options.url}`)

      const settings = await this.contentAPI.settings.browse()
      const collection = store.addCollection({ typeName: 'GhostSettings' })

      collection.addNode(settings)
    })
  }
}

module.exports = GhostSettings

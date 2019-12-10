function config() {
  let ghostConfigs
  let ghostConfig

  try {
      ghostConfigs = require(`./.ghost.json`)
  } catch (e) {
      ghostConfigs = {
          production: {
              apiUrl: process.env.GHOST_API_URL,
              contentApiKey: process.env.GHOST_CONTENT_API_KEY,
          },
      }
  } finally {
      ghostConfig = process.env.NODE_ENV === `development` ? ghostConfigs.development : ghostConfigs.production

      if (!ghostConfig.baseUrl || !ghostConfig.contentKey || ghostConfig.contentKey.match(/<key>/)) {
          throw new Error(`GHOST_API_URL and GHOST_CONTENT_API_KEY are required to build. Check the README.`) // eslint-disable-line
      }
  }

  return {
    baseUrl: '',
    contentKey: '',
    version: 'v2',
    perPage: 100,
    typeName: 'Ghost',
    url: ghostConfig.baseUrl,
    ...ghostConfig
  };
}

module.exports = config

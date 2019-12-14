const GhostSettings = ({ settings, navigation }) => `type ${settings} implements Node {
  id: ID!
  codeinjection_foot: String
  codeinjection_head: String
  cover_image: String
  description: String
  facebook: String
  ghost_foot: String
  ghost_head: String
  icon: String
  lang: String
  logo: String
  meta_description: String
  meta_title: String
  navigation: [${navigation}]
  og_description: String
  og_image: String
  og_title: String
  timezone: String
  title: String
  twitter: String
  twitter_description: String
  twitter_image: String
  twitter_title: String
  url: String
}
type ${navigation} {
  label: String
  url: String
}`

module.exports = {
  GhostSettings
}

<script>
export default {
  computed: {
    site() {
      let metadata = this.$static.metadata;
      metadata.ghost = this.$static.allGhostSettings.edges[0].node
      return metadata
    },
  }
}
</script>
<static-query>
  query Home {
    metadata {
      siteName
      siteDescription
      siteUrl
      pathPrefix
      disqusShortName
    }
    allGhostSettings {
      edges {
        node {
          title
          description
          logo
          icon
          twitter
          facebook
          navigation {
            label
            url
          }
        }
      }
    }
  }
</static-query>

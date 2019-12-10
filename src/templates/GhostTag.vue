<template>
  <Layout>
    <main>
      <header>
        <div class="max-w-xl md:max-w-3xl xl:max-w-4xl flex flex-col-reverse mx-auto text-center px-6 pt-24 pb-10 md:py-32 border-b border-gray-300">
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-sans font-bold mb-2 capitalize">{{ titleCase($page.tag.title) }}</h1>
          <svg class="w-5 sm:w-6 fill-current text-gray-500 mx-auto mb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" role="img" aria-labelledby="tagIcon"><title id="tagIcon">Posts tagged</title><path d="M0 10V2l2-2h8l10 10-10 10L0 10zm4.5-4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/></svg>
        </div>
        <nav class="absolute top-0 left-0 z-20 mt-6 ml-6">
          <g-link to="/" class="text-sm border text-gray-900 border-gray-400 opacity-75 hover:opacity-100 rounded-full px-4 py-2 transition-opacity">&larr; Home</g-link>
        </nav>
      </header>
      <section>
        <post-item v-for="edge in $page.tag.belongsTo.edges" :key="edge.node.id" :post="edge.node" />
        <site-footer class="py-8 sm:py-16" />
      </section>
    </main>
  </Layout>
</template>

<script>
import moment from 'moment'
import SiteMetadata from '@/mixins/SiteMetadata'
import PostItem from '@/components/PostItem'
import SiteFooter from '@/components/Footer'
import Pagination from '@/components/Pagination'

export default {
  mixins: [SiteMetadata],
  components: {
    PostItem,
    Pagination,
    SiteFooter,
  },
  metaInfo () {
    return {
      title: `Posts tagged "${this.titleCase(this.$page.tag.title)}"`,
      meta: [
        {
          key: this.$page.tag.meta_title,
          name: this.$page.tag.meta_description,
          content: `Browse posts tagged "${this.titleCase(this.$page.tag.title)}"`
        },

        { property: "og:type", content: 'website' },
        { property: "og:title", content: `Posts tagged "${this.titleCase(this.$page.tag.title)}"` },
        { property: "og:description", content: `Browse posts tagged "${this.titleCase(this.$page.tag.title)}"` },
        { property: "og:url", content: `${this.site.siteUrl}/${this.$page.tag.path}/` },
        { property: "og:image", content: this.$page.tag.feature_image },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `Posts tagged "${this.titleCase(this.$page.tag.title)}"` },
        { name: "twitter:description", content: `Browse posts tagged "${this.titleCase(this.$page.tag.title)}"` },
        { name: "twitter:image", content: this.$page.tag.feature_image },
      ],
    }
  },
  methods: {
    titleCase(str) {
      return str.replace('-', ' ').split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
    }
  },
}
</script>

<page-query>
query Tag ($path: String!) {
  tag:ghostTag (path: $path) {
    title: name
    slug
    path
    belongsTo {
      edges {
        node {
          ...on GhostPost {
            title
            path
            datetime: published_at (format: "YYYY-MM-DD HH:mm:ss")
            date: published_at
            description: excerpt
            coverImage: feature_image
            content: html
            slug
          }
        }
      }
    }
  }
}
</page-query>

<template>
  <Layout>
    <main>
      <header>
        <div class="max-w-xl md:max-w-3xl xl:max-w-4xl flex flex-col-reverse mx-auto text-center px-6 pt-24 pb-10 md:py-32 border-b border-gray-300">
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-sans font-bold mb-2 capitalize">{{ $page.author.name }}</h1>
          <author-image :author="$page.author" />
        </div>
        <nav class="absolute top-0 left-0 z-20 mt-6 ml-6">
          <g-link to="/" class="text-sm border text-gray-900 border-gray-400 opacity-75 hover:opacity-100 rounded-full px-4 py-2 transition-opacity">&larr; Home</g-link>
        </nav>
      </header>
      <section>
        <post-item v-for="edge in $page.author.belongsTo.edges" :key="edge.node.id" :post="edge.node" />
      </section>
      <pagination :base="`author/${$page.author.slug}`" :info="$page.author.belongsTo.pageInfo" v-if="$page.author.belongsTo.pageInfo.totalPages > 1" />
      <site-footer class="pb-8 sm:pb-10" />
    </main>
  </Layout>
</template>

<script>
import moment from 'moment'
import SiteMetadata from '@/mixins/SiteMetadata'
import PostItem from '@/components/PostItem'
import SiteFooter from '@/components/Footer'
import Pagination from '@/components/Pagination'
import AuthorImage from '@/components/AuthorImage'

export default {
  mixins: [SiteMetadata],
  components: {
    PostItem,
    Pagination,
    SiteFooter,
    AuthorImage
  },
  metaInfo () {
    return {
      title: `Posts written by ${this.$page.author.name}`,
      meta: [
        {
          key: 'description',
          name: 'description',
          content: `Browse posts written by ${this.$page.author.name}`
        },

        { property: "og:type", content: 'website' },
        { property: "og:title", content: `Posts written by ${this.$page.author.name}` },
        { property: "og:description", content: `Browse posts written by ${this.$page.author.name}` },
        { property: "og:url", content: `${this.site.siteUrl}/author/${this.$page.author.slug}/` },
        { property: "og:image", content: this.avatar },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `Posts written by ${this.$page.author.name}` },
        { name: "twitter:description", content: `Browse posts written by ${this.$page.author.name}` },
        { name: "twitter:site", content: this.$page.author.twitter },
        { name: "twitter:creator", content: this.$page.author.twitter },
        { name: "twitter:image", content: this.avatar },
      ],
    }
  },
  computed: {
    avatar () {
      return this.$page.author.profile_image || this.site.ghost.icon || this.site.ghost.logo;
    },
  },
}
</script>

<page-query>
query Author ($path: String!, $page: Int) {
  author: ghostAuthor(path: $path) {
    id
    name
    slug
    profile_image
    belongsTo (page: $page, perPage: 6) @paginate {
      totalCount
      pageInfo {
        totalPages
        currentPage
      }
      edges {
        node {
          ...on GhostPost {
            title
            description: excerpt
            html
            content: html
            datetime: published_at (format: "YYYY-MM-DD HH:mm:ss")
            date: published_at
            slug
            id
            coverImage: feature_image
            tags {
              id
              name
              slug
            }
            author: primary_author {
              name
              twitter
            }
          }
        }
      }
    }
  }
}
</page-query>

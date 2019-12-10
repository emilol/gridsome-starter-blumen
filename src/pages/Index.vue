<template>
  <Layout class="bg-white">
    <div class="flex flex-col py-10 sm:flex-row max-w-5xl mx-auto">
      <sidebar/>
      <main>
        <section>
          <post-item v-for="edge in $page.posts.edges" :key="edge.node.id" :post="edge.node" />
        </section>
        <pagination :info="$page.posts.pageInfo" v-if="$page.posts.pageInfo.totalPages > 1" />
      </main>
    </div>
  </Layout>
</template>

<script>
import SiteMetadata from '@/mixins/SiteMetadata'
import Sidebar from '@/components/Sidebar'
import PostItem from '@/components/PostItem'
import Pagination from '@/components/Pagination'

export default {
  mixins: [SiteMetadata],
  components: {
    Sidebar,
    PostItem,
    Pagination,
  },
  metaInfo () {
    return {
      meta: [
        { property: "og:type", content: 'website' },
        { property: "og:url", content: this.site.siteUrl },
        { property: "og:image", content: this.site.ghost.icon || this.site.ghost.logo },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: this.site.ghost.title },
        { name: "twitter:description", content: this.site.ghost.description },
        { name: "twitter:site", content: this.site.ghost.twitter },
        { name: "twitter:creator", content: this.site.ghost.twitter },
        { name: "twitter:image", content: this.site.ghost.icon || this.site.ghost.logo },
      ],
    }
  },
}
</script>

<page-query>
  query Home ($page: Int) {
    posts: allGhostPost(
        sortBy: "published_at",
        order: DESC,
        page: $page,
        perPage: 6) @paginate {
      totalCount
      pageInfo {
        totalPages
        currentPage
      }
      edges {
        node {
          title
          description: excerpt
          html
          content: html
          datetime: published_at (format: "YYYY-MM-DD HH:mm:ss")
          date: published_at
          slug
          id
          cover: feature_image
          tags {
            id
            title: name
            slug
          }
          author: primary_author {
            title: name
          }
        }
      }
    }
  }
</page-query>


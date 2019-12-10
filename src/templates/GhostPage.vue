<template>
  <Layout>
    <main>
      <header class="max-w-xl md:max-w-2xl xl:max-w-3xl mx-auto text-center px-6 pt-24">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-sans font-bold mb-1">{{$page.page.title}}</h1>
      </header>
      <nav class="absolute top-0 left-0 z-20 mt-6 ml-6">
        <g-link to="/" class="text-gray-900 border-gray-400 text-sm border opacity-75 hover:opacity-100 rounded-full px-4 py-2 transition-opacity">&larr; Home</g-link>
      </nav>
      <article class="max-w-xl md:max-w-2xl xl:max-w-3xl mx-auto px-6 sm:px-12 pt-16 border-b border-gray-300 pb-10 mb-16">
        <div class="markdown text-lg leading-normal text-gray-700" v-html="$page.page.content" />
      </article>

      <site-footer class="pb-8 sm:pb-10" />
    </main>
  </Layout>
</template>

<script>
import SiteMetadata from '@/mixins/SiteMetadata'
import SiteFooter from '@/components/Footer'

export default {
  mixins: [SiteMetadata],
  components: {
    SiteFooter,
  },
  metaInfo () {
    return {
      title: this.$page.page.meta_title,
      meta: [
        {
          key: this.$page.page.meta_title,
          name: this.$page.page.meta_description,
          content: this.$page.page.description
        },

        { property: "og:type", content: 'article' },
        { property: "og:title", content: this.$page.page.og_title || this.$page.page.title },
        { property: "og:description", content: this.$page.page.og_description || this.$page.page.description },
        { property: "og:url", content: `${this.site.siteUrl}${this.$page.page.path}` },
        { property: "og:image", content: this.$page.page.og_image || this.$page.page.feature_image },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: this.$page.twitter_title || this.$page.page.title },
        { name: "twitter:description", content: this.$page.twitter_description || this.$page.page.description },
        { name: "twitter:image", content: this.$page.page.twitter_image || this.$page.page.feature_image },
      ],
    }
  }
}
</script>

<page-query>
query Page ($path: String!) {
  page: ghostPage (path: $path) {
    # Main fields
    title
    path
    slug
    featured
    feature_image
    excerpt
    custom_excerpt
    description: excerpt

    # SEO
    meta_title
    meta_description
    og_description
    og_image
    og_title
    twitter_description
    twitter_image
    twitter_title

    # Authors
    authors {
      name
      slug
      bio
      # email
      profile_image
      twitter
      facebook
      website
    }
    author: primary_author {
      name
      slug
      bio
      # email
      profile_image
      twitter
      facebook
      website
    }

    # Tags
    primary_tag {
      name
      slug
      description
      feature_image
      meta_description
      meta_title
      visibility
    }
    tags {
      name
      slug
      description
      feature_image
      meta_description
      meta_title
      visibility
    }

    # Content
    plaintext
    html
    content: html

    # Additional fields
    url
    uuid
    page
    codeinjection_foot
    codeinjection_head
    codeinjection_styles
    comment_id
  }
}
</page-query>

<template>
  <Layout>
    <main>
      <post-header :post="$page.post" />

      <article class="post max-w-xl md:max-w-2xl xl:max-w-3xl mx-auto px-6 sm:px-12 pt-16" :class="{'border-b border-grey-lighter pb-10 mb-16': !author}">

        <alert v-if="postIsOlderThanOneYear" class="bg-orange-100 border-l-4 border-orange-500 text-orange-900">
          This post is over a year old, some of this information may be out of date.
        </alert>

        <div :class="{'pb-10': author || $page.post.tags}" class="markdown text-lg leading-normal text-gray-700" v-html="$page.post.content" />

        <footer v-if="author || $page.post.tags" class="flex flex-wrap pb-10 sm:pb-16">
          <div>
            <g-link v-for="tag in $page.post.tags" :key="tag.id" :to="`tag/${tag.slug}`" class="inline-block text-teal-400 hover:text-white hover:bg-teal-400 border border-teal-400 font-sans font-bold text-xs sm:text-sm px-4 py-2 mr-4 mb-2 rounded-full transition-color transition-bg">
            <svg class="inline w-3 fill-current align-middle mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" role="img"><path d="M0 10V2l2-2h8l10 10-10 10L0 10zm4.5-4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/></svg>
            {{ tag.name }}
            </g-link>
          </div>
          <div v-if="author" class="flex flex-wrap items-center justify-center sm:justify-left border-t border-b border-gray-300 w-full mt-10 py-10 sm:px-16">
            <author-image :author="author" />
            <div class="px-2 sm:w-4/5 text-center sm:text-left">
              <h4 class="font-sans font-bold text-lg sm:text-xl mb-2">
                <g-link :to="`author/${author.slug}/`" class="text-black hover:text-gray-600 capitalize border-b-2 border-transparent transition-color">{{ author.name }}</g-link>
              </h4>
              <p class="leading-normal">
                <socials :socials="socials" :ghost-meta="author" />
              </p>
            </div>
          </div>
          <comments />
        </footer>
      </article>

      <site-footer class="pb-8 sm:pb-10" />
    </main>
  </Layout>
</template>

<script>
import moment from 'moment'
import SiteMetadata from '@/mixins/SiteMetadata'
import socialsConfig from '../../.socials.json';
import Alert from '@/components/Alert'
import Socials from '@/components/Socials';
import PostHeader from '@/components/PostHeader'
import AuthorImage from '@/components/AuthorImage'
import Comments from '@/components/Comments'
import slugify from '@sindresorhus/slugify'
import SiteFooter from '@/components/Footer'
import Prism from 'prismjs';
import 'prismjs/plugins/line-highlight/prism-line-highlight';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-powershell';
import 'prismjs/components/prism-json';

export default {
  mixins: [SiteMetadata],
  components: {
    Alert,
    PostHeader,
    SiteFooter,
    Socials,
    AuthorImage,
    Comments
  },
  metaInfo () {
    return {
      title: `${this.$page.post.title} ${this.$page.post.tag ? '- '+this.$page.post.tag.name : ''}`,
      meta: [
        {
          key: 'description',
          name: 'description',
          content: this.$page.post.excerpt
        },

        { property: "og:type", content: 'article' },
        { property: "og:title", content: this.$page.post.title },
        { property: "og:description", content: this.$page.post.excerpt },
        { property: "og:url", content: this.postUrl },
        { property: "article:published_time", content: moment(this.$page.post.date).format('YYYY-MM-DD') },
        { property: "og:image", content: this.$page.post.og_image || this.$page.post.feature_image },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: this.$page.post.title },
        { name: "twitter:description", content: this.$page.post.twitter_description || this.$page.post.excerpt },
        { name: "twitter:site", content: this.$page.post.author.twitter },
        { name: "twitter:creator", content: this.$page.post.author.twitter },
        { name: "twitter:image", content: this.$page.post.twitter_image || this.$page.post.feature_image },
      ],
    }
  },
  mounted () {
    import('medium-zoom').then(mediumZoom => {
      this.zoom = mediumZoom.default('.markdown figure > img')
    })
    this.$nextTick(()=> {
      Prism.highlightAll();
    });
  },
  computed: {
    config () {
      return config
    },
    author() {
      return this.$page.post.author;
    },
    socials() {
      return socialsConfig[this.author.slug] || {};
    },
    postIsOlderThanOneYear () {
      let postDate = moment(this.$page.post.date)
      return moment().diff(postDate, 'years') > 0 ? true : false
    },
    postUrl () {
      let siteUrl = this.site.siteUrl
      let postSlug = this.$page.post.slug

      return `${siteUrl}/${postSlug}/`
    },
  },
}
</script>
<style>
.post p > img {
    border-radius: 3px;
    display: block;
    margin: 1.5rem auto;
    max-width: 100%;
    text-align: center;
    width: auto;
}
.post :not(pre)>code {
    padding: 0 5px 2px;
    background-color: #f7f7f9;
    border: 1px solid #e1e1e8;
    border-radius: 3px;
    word-break: break-word;
}
</style>

<page-query>
  query Post ($path: String!) {
    post: ghostPost (path: $path) {
      # Main fields
      title
      slug
      featured
      feature_image
      cover: feature_image
      excerpt
      custom_excerpt
      description: excerpt

      # Dates formatted
      datetime: published_at (format: "YYYY-MM-DD HH:mm:ss")

      # Dates unformatted
      date: published_at

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

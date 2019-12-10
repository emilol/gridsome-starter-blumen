<template>
  <header>
    <div class="pt-24">
      <div class="max-w-xl md:max-w-3xl xl:max-w-4xl mx-auto text-center px-6">
        <p class="text-gray-700 text-xs mb-2 uppercase">{{ readingTime }}</p>
        <h1 class="text-3xl sm:text-5xl leading-tight font-sans font-bold mb-2 text-black">{{ post.title }}</h1>
        <p class="text-gray-700">
          <span v-if="post.author">
            <g-link :to="`author/${post.author.slug}/`" class="text-gray-700 capitalize border-b border-transparent hover:border-gray-400 transition-border-color">{{ titleCase(post.author.name) }}</g-link> &bull;
          </span>
          <time :datetime="post.date" class="capitalize">{{ formattedPublishDate }}</time>
        </p>
      </div>
    </div>
    <div v-if="post.cover" class="px-6 sm:px-12 pt-16">
      <img :src="post.cover" :alt="post.title" class="max-w-full md:max-w-2xl xl:max-w-4xl mx-auto">
    </div>
    <nav class="absolute top-0 left-0 z-20 mt-6 ml-6">
      <g-link to="/" class="text-gray-900 border-gray-400 text-sm border opacity-75 hover:opacity-100 rounded-full px-4 py-2 transition-opacity">&larr; Home</g-link>
    </nav>
  </header>
</template>

<script>
import moment from 'moment'
import Parallax from "vue-parallaxy"
import { readingTime } from '@tryghost/helpers'

export default {
  props: ['post'],
  components: {
    Parallax
  },
  methods: {
    titleCase(str) {
      return str.replace('-', ' ')
                .split(' ')
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ')
    }
  },
  computed: {
    formattedPublishDate() {
      return moment(this.post.date).format('DD MMMM, YYYY');
    },
    readingTime() {
      return readingTime(this.post);
    }
  },
}
</script>

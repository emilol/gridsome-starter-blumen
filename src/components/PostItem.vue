<template>
  <article>
    <div class="mx-auto max-w-3xl px-10">
      <div class="py-8 sm:py-14">
        <header>
          <time :datetime="post.date" class="text-gray-700 text-xs mb-2 uppercase">{{ formatPublishDate(post.date) }}</time>
          <span v-if="post.tags && post.tags.length > 0"> · </span>
          <span v-if="post.tags && post.tags.length > 0">
            <g-link :to="`tag/${post.tags[0].slug}/`" style="color:#6a5eff" class="text-gray-700 text-xs border-b border-transparent hover:border-gray-400 transition-border-color uppercase">{{ post.tags[0].title }}</g-link>
          </span>
          <h2 class="text-3xl sm:text-4xl leading-tight font-sans mb-1 sm:mb-2">
            <g-link :to="`${post.slug}`" class="text-black font-bold">{{ post.title }}</g-link>
          </h2>
          <p class="text-gray-700 leading-normal text-sm sm:text-base">
            <span>{{ readingTime }}</span>
          </p>
        </header>
      </div>
    </div>
  </article>
</template>

<script>
import moment from 'moment'
import { readingTime } from '@tryghost/helpers'

export default {
  props: ['post'],
  computed: {
    formattedPublishDate() {
      return moment(this.post.date).format('DD MMMM, YYYY');
    },
    readingTime() {
      return readingTime(this.post);
    }
  },
  methods: {
    formatPublishDate(date) {
      return moment(date).format('MMMM, YYYY');
    },
    excerpt(post, length, clamp) {
      if (post.excerpt) {
        return post.excerpt
      }

      length = length || 280
      clamp = clamp || ' ...'
      let text = post.content.replace(/<pre(.|\n)*?<\/pre>/gm, '').replace(/<[^>]+>/gm, '')

      return text.length > length ? `${ text.slice(0, length)}${clamp}` : text
    }
  },
}
</script>

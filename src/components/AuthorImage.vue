<template>
  <figure class="px-2 mb-1 sm:mb-0 w-full sm:w-1/5 mx-auto flex justify-center">
    <g-link :to="`author/${author.slug}/`">
      <img :src="avatar" :alt="author.name" @error="imageLoadError" width="75" class="rounded-full p-4 sm:p-0">
    </g-link>
  </figure>
</template>

<script>
import SiteMetadata from '@/mixins/SiteMetadata'

export default {
  mixins: [SiteMetadata],
  props: [
    'author',
  ],
  computed: {
    avatar () {
      return this.author.profile_image;
    }
  },
  methods: {
    imageLoadError (e) {
      e.target.src = `/images/authors/default.png`
    },
  },
}
</script>

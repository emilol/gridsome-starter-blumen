<template>
  <header>
    <div class="sm:h-screen">
      <div class="w-full pb-20 sm:h-full sm:max-w-sm mx-auto px-10 border-r border-gray-300">
        <g-link to="/">
          <img width="75" height="75" class="rounded-full mx-0" :alt="ghost.title" :src="ghost.icon || ghost.logo" />
        </g-link>
        <h1 class="text-2xl sm:text-md font-sans font-bold pt-4">
          <g-link to="/" class="text-black">{{ghost.title}}</g-link>
        </h1>
        <p class="text-gray-700 text-md sm:text-sm pb-4">{{ghost.description}}</p>
        <ul v-if="ghost.navigation" class="pb-4">
          <li v-for="(item) in ghost.navigation" :key="item.url" class="py-1">
            <a :href="item.url" class="border-b border-transparent hover:border-gray-400">{{item.label}}</a>
          </li>
        </ul>
        <socials :socials="socials" :ghostMeta="ghost" />
      </div>
    </div>
  </header>
</template>

<script>
import Menu from './Menu'
import Socials from './Socials'
import socialsConfig from '../../.socials.json'
import SiteMetadata from '@/mixins/SiteMetadata'

export default {
  mixins: [SiteMetadata],
  components: {
    Socials
  },
  computed: {
    socials() {
      return socialsConfig['site'] || {};
    },
    ghost() {
      return this.site.ghost;
    }
  },
  metaInfo () {
    return {
      title: this.site.title,
      meta: [
        { property: "og:type", content: 'website' },
        { property: "og:title", content: this.site.title },
        { property: "og:description", content: this.site.description },
      ],
    }
  },
}
</script>

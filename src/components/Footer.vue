<template>
  <footer class="text-gray-700 text-sm leading-normal flex flex-wrap justify-between mx-auto max-w-3xl px-6 sm:px-12">
    <div class="w-full sm:w-1/2 mb-4 sm:mb-0">
      <p><a href="https://github.com/cossssmin/gridsome-starter-bleda" class="border-b border-transparent hover:border-gray-400 transition-border-color">Blumen</a> by <a href="https://github.com/emilol" class="border-b border-transparent hover:border-gray-400 transition-border-color">@emilol</a></p>
      <p>Built with <a href="https://gridsome.org" class="border-b border-transparent hover:border-gray-400 transition-border-color">Gridsome</a> &amp; <a href="https://tailwindcss.com/" class="border-b border-transparent hover:border-gray-400 transition-border-color">Tailwind CSS</a>.</p>
    </div>
    <div class="w-full sm:w-1/2">
      <nav>
        <ul v-if="site.ghost.navigation" class="flex sm:justify-end -mx-2">
          <li v-for="(item) in site.ghost.navigation" :key="item.url" class="px-2">
            <a :href="item.url" class="border-b border-transparent hover:border-gray-400 transition-border-color">{{item.label}}</a>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>

<script>
import SiteMetadata from '@/mixins/SiteMetadata'

export default {
  mixins: [SiteMetadata],
  name: 'Footer',
}
</script>

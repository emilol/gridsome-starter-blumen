<template>
  <ul v-if="socials" class="flex flex-wrap sm:w-1/2">
    <template  v-for="(url, name) in icons">
      <li v-if="url" :key="name" class="icon">
        <a :href="url">
          <component :is="name"></component>
        </a>
      </li>
    </template>
  </ul>
</template>

<script>
import icons from '@/assets/icons';

export default {
  props: [
    'socials',
    'ghostMeta'
  ],
  components: {
    ...icons
  },
  computed: {
    icons() {
      const socials = this.socials;

      if (this.ghostMeta) {
        if (this.ghostMeta.twitter) socials.twitter = `https://twitter.com/${this.ghostMeta.twitter}`;
        if (this.ghostMeta.facebook) socials.facebook = `https://facebook.com/${this.ghostMeta.facebook}`;
      }

      return socials;
    }
  },
}
</script>
<style>
  .icon {
    padding: 0;
    margin: .25rem;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    height: 35px;
    width: 2.1875rem;
    line-height: 2.1875rem;
    border-radius: 50%;
    text-align: center;
    border: 1px solid #ebebeb;
  }
  .icon a {
    border: 0;
    display: flex;
    line-height: 2.1875rem;
    text-align: center;
  }
  .icon svg {
    display: inline-block;
    width: 1em;
    height: 1em;
    stroke-width: 0;
    stroke: currentColor;
    fill: currentColor;
    font-style: normal;
    font-weight: 400;
    speak: none;
    margin-right: .2em;
    text-align: center;
    font-variant: normal;
    text-transform: none;
    line-height: 1em;
    margin-left: .2em;
    -webkit-font-smoothing: antialiased;
  }

  .icon:hover svg {
    stroke: #5d93ff;
    fill: #5d93ff;
  }
</style>

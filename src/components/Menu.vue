<template>
  <ul v-if="site">
    <li>
      asd{{JSON.stringify(site)}}
    </li>
    <li v-for="(item) in navigation" :key="item.url">
      <a :href="url">{{item.label}}</a>
    </li>
  </ul>
</template>

<script>
export default {
  props: [
    'site',
  ],
  computed: {
    navigation() {
      return this.site.navigation;
    }
  }
}
</script>

<template>
  <div class="comments w-full mt-8">
    <vue-disqus :shortname="shortname"></vue-disqus>
  </div>
</template>
<script>
import SiteMetadata from '@/mixins/SiteMetadata'

export default {
  mixins: [SiteMetadata],
  computed: {
    shortname() {
      return this.site.disqusShortName;
    }
  }
}
</script>

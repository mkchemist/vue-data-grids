<template>
  <div>
    <input
      type="search"
      class="form-control form-control-sm"
      v-model="search"
      placeholder="Search.."
    />
  </div>
</template>

<script>
export default {
  name: "vue-data-grids-search",

  props: {
    onSearch: {
      type: Function,
    },
  },

  data() {
    return {
      /**
       * search data model
       */
      search: null,
    };
  },

  watch: {
    /**
     * invoke onSearch callback if exists
     * when search data model changed
     *
     */
    search: function () {
      if (this.onSearch) {
        this.onSearch(this.search.trim());
      }
    },
  },
};
</script>

<style></style>

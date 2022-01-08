<template>
  <span v-html="tableInfo"></span>
</template>

<script>
export default {
  name: "vue-data-grids-info",
  props: {
    /**
     * current result per page
     */
    rpp: {
      type: Number,
      required: true,
    },
    /**
     * total rows
     */
    total: {
      type: Number,
      required: true
    },
    /**
     * current page
     */
    page: {
      type: Number,
      required: true
    },
    /**
     * selected rows
     */
    selected: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    /**
     * generate table info
     */
    tableInfo() {
      let start = (this.page - 1) * this.rpp;
      let end = start + this.rpp;
      start += 1;
      if(end > this.total) {
        end = this.total;
      }
      if(this.total === 0) {
        start = 0;
      }
      let rows = end - start + 1;
      return `<p class="mb-0 small">
        Showing <b>${rows}</b>  results from  <b>${start}</b> 
        to <b>${end}</b> of <b>${this.total} row${this.total > 1 ? 's' : ''}</b>
        ${this.selected.length? `, selected <b>${this.selected.length}</b>` : ''}
      </p>`
    }
  }
  
}
</script>

<style>

</style> 
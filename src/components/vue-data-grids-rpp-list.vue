<template>
  <div class="d-flex align-items-center">
    <select
      name="rpp_selector"
      id="rpp_selector"
      class="form-control form-control-sm col mx-1"
      v-model="selected"
    >
      <option
        v-for="(item, index) in rpp_list"
        :key="`item_${index}`"
        :value="item"
      >
        {{ item }} row{{ item > 1 ?'s' : '' }}
      </option>
    </select>
  </div>
</template>

<script>
import {
  VueDataGridsDefaultRPP,
  VueDataGridsDefaultRPPList,
} from "../constants";
export default {
  name: "vue-data-grids-rpp-list",

  props: {
    /**
     * table result per page
     */
    rpp: {
      type: Number,
      default: () => VueDataGridsDefaultRPP,
    },
    /**
     * table result per page option
     */
    rpp_list: {
      type: Array,
      default: () => VueDataGridsDefaultRPPList,
    },
    /**
     * on rpp list changed
     */
    onRPPChange: {
      type: Function,
    },
  },

  data() {
    return {
      /**
       * selected rpp
       */
      selected: this.rpp,
    };
  },

  watch: {
    /**
     * invoke onRPPChange when
     * current rpp changed
     */
    selected: function () {
      if (this.onRPPChange) {
        this.onRPPChange(this.selected);
      }
    },
  },
};
</script>

<style></style>

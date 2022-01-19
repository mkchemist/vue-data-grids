<template>
  <ul id="vue__data-grids-pagination-list" class="nav align-items-center">
    <li class="nav-item">
      <button
        class="btn btn-light btn-sm border"
        @click="selectPage(1)"
        :disabled="currentPage === 1"
      >
        <span> &blacktriangleleft; </span>
        <span>First</span>
      </button>
    </li>
    <li class="nav-item mx-1">
       <select v-model.number="currentPage" class="form-control form-control-sm small">
        <option v-for="page in totalPages" :key="`page_${page}`" :value="page" >Page {{ page }}</option>
      </select>
    </li>
    <!-- <li
      class="nav-item mx-1"
      v-for="page in totalPages"
      :key="`page_link_${page}`"
    >
      <button
        :class="`btn ${
          page === currentPage ? 'btn-primary' : 'btn-light'
        } btn-sm border`"
        @click="selectPage(page)"
      >
        <span>{{ page }}</span>
      </button>
     
    </li> -->
    <li class="nav-item">
      <button
        class="btn btn-light btn-sm border"
        @click="selectPage(totalPages)"
        :disabled="currentPage === totalPages"
      >
        <span>last</span>
        <span> &blacktriangleright; </span>
      </button>
    </li>
  </ul>
</template>

<script>
import { VueDataGridsDefaultRPP } from '../constants';
export default {
	props: {
		/**
     * result per page
     */
		rpp: {
			type: Number,
			default: () => VueDataGridsDefaultRPP,
		},
		/**
     * total rows count
     */
		total: {
			type: Number,
		},
		/**
     * current page
     */
		page: {
			type: Number,
		},
		/**
     * on page change callback
     */
		onPageChange: {
			type: Function,
		},
	},

	computed: {
		/**
     * total pages
     */
		totalPages() {
			try {
				return Math.ceil(this.total / this.rpp);
			} catch (err) {
				console.log(err);
				return 0;
			}
		}
	},

	data() {
		return {
			/**
       * current active page
       */
			currentPage: this.page,
		};
	},

	watch: {
		/**
     * watching change of result per page
     */
		rpp: function () {
			this.adjustCurrentPage();
		},
		/**
     * watching change of current active page
     */
		currentPage: function () {
			if (this.onPageChange) {
				this.onPageChange(this.currentPage);
			}
		},
	},

	methods: {
		/**
     * select Page
     *
     * @param {Number} page
     */
		selectPage(page) {
			this.currentPage = page;
		},
		/**
     * adjust current page when changing
     * result page page option
     *
     *
     */
		adjustCurrentPage() {
			let total = this.total,
				currentTotal = this.rpp * this.currentPage;

			if (currentTotal > total) {
				this.currentPage = this.totalPages;
			}
		},
	},
};
</script>

<style></style>

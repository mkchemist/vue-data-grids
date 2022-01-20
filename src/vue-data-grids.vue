<template>
  <div id="vue__data-grids">
    <!-- table wrapper -->
    <div id="vue__data-grids-wrapper">
      <!-- table buttons -->
      <div id="vue__data-grids-buttons-container" class="mb-3">
        <slot name="table-buttons"></slot>
      </div>
      <!-- end of table buttons -->
      <!-- table controller -->
      <div
        class="d-flex justify-content-between mb-3"
        id="vue__data-grids-table-controller"
      >
        <vue-data-grids-search :onSearch="onSearch" />
        <div class="d-flex">
          <vue-data-grids-rpp-list
            :rpp="query.rpp"
            :rpp_list="rpp_list"
            :onRPPChange="onRppChange"
          />
          <vue-data-grids-themes-list
            :theme="theme"
            :onThemeChange="onThemeChange"
          />
        </div>
      </div>
      <!-- end of table controller -->
      <!-- table info -->
      <div id="vue__data-grids-info" class="mb-3">
        <vue-data-grids-info
          :total="totalRowsCount"
          :rpp="query.rpp"
          :page="query.page"
          :selected="query.selected"
        />
      </div>
      <!-- end table info -->
      <!-- table container -->
      <div
        id="vue__data-grids-table-container"
        class="vue__data-grids-table-container"
      >
        <vue-data-grids-processing v-if="isProcessing" />
        <table
          :class="`${tableClasses.table} table-${theme} ${
            responsive ? 'table-responsive' : ''
          }`"
          id="vue__data-grids-table"
        >
          <thead id="vue__data-grids-table-header">
            <tr>
              <th v-if="checkbox">
                <input
                  type="checkbox"
                  name="vue__data-grids-all-checkbox"
                  id="vue__data-grids-all-checkbox" ref="checkAllBox"
                  @click="checkAllRows"
                />
              </th>
              <!-- table column header start -->
              <th
                v-for="(column, cIndex) in columns"
                :key="`col_${cIndex}`"
                class=""
              >
                <!-- table column header slot -->
                <slot :name="`${convertColumnNameToSlot(column)}_col`">
                  <template v-if="column.sortable">
                    <a
                      href=""
                      :class="`text-decoration-none d-flex justify-content-between`"
                      @click.prevent="sortingTableBy(column)"
                    >
                      <span
                        :class="`${
                          theme === 'dark' ? 'text-light' : 'text-dark'
                        }`"
                        >{{ column.title }}</span
                      >
                      <span>
                        <span span :class="`text-muted`">&uarr;</span>
                        <span :class="`text-muted`">&darr;</span>
                      </span>
                    </a>
                  </template>
                  <template v-else>
                    <span
                      :class="`${
                        theme === 'dark' ? 'text-light' : 'text-dark'
                      }`"
                      >{{ column.title }}</span
                    >
                  </template>
                </slot>
                <!-- end of table column header slot -->
              </th>
              <!-- table column header end -->
            </tr>
          </thead>
          <tbody v-if="!serverSideData.error">
            <!-- table body data row start -->
            <tr v-for="(row, rIndex) in renderData" :key="`row_${rIndex}`">
              <td v-if="checkbox">
                <input
                  type="checkbox"
                  :name="`vue__data-grids-row-checkbox`"
                  :id="`vue__data-grids-row-${rIndex}-checkbox`"
                  v-model="query.selected"
                  :value="row"
                />
              </td>
              <!-- table body data column start -->
              <td
                v-for="(column, cIndex) in columns"
                :key="`row_${rIndex}_col_${cIndex}`"
              >
                <!-- table body data slot -->
                <slot :name="`${convertColumnNameToSlot(column)}`" :data="row">
                  <!-- incase of data is a function -->
                  <template v-if="typeof column.data === 'function'">
                    <span v-html="column.data(row)" class="row-data"></span>
                  </template>
                  <!-- incase of data is a string -->
                  <template v-else>
                    <span>{{ getDataObjectValue(row, column) }}</span>
                  </template>
                </slot>
                <!-- end of table body data slot -->
              </td>
              <!-- table body data column end -->
            </tr>
            <!-- table body data row end -->
          </tbody>
          <tbody v-else-if="serverSideData.error">
            <tr>
              <td
                :colspan="columns.length + (checkbox ? 1 : 0)"
                class="text-danger text-center"
              >
                {{ errorMessage }}
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td
                :colspan="columns.length + (checkbox ? 1 : 0)"
                class="text-center"
              >
                No results
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- end of table container -->
      <!-- table pagination -->
      <div id="vue__data-grids-pagination-container">
        <vue-data-grids-pagination
          :rpp="query.rpp"
          :total="totalRowsCount"
          :page="query.page"
          :onPageChange="onPageChange"
        />
      </div>
      <!-- end of table pagination -->
    </div>
    <!-- end of table wrapper -->
  </div>
</template>

<script>
import {
	FAILED,
	IDLE,
	LOADING,
	SUCCEEDED,
	VueDataGridsDefaultAjaxConfig,
	VueDataGridsDefaultClasses,
	VueDataGridsDefaultRPP,
	VueDataGridsDefaultRPPList,
	VueDataGridsDefaultTheme,
} from './constants';
import {
	prepareServerSideRequestParameter,
	searchTableData,
	sortTableData,
	toSnakeCase,
} from './utils';
import { get } from 'lodash';
import vueDataGridsSearch from './components/vue-data-grids-search.vue';
import VueDataGridsRppList from './components/vue-data-grids-rpp-list.vue';
import VueDataGridsPagination from './components/vue-data-grids-pagination.vue';
import VueDataGridsInfo from './components/vue-data-grids-info.vue';
import VueDataGridsThemesList from './components/vue-data-grids-themes-list.vue';
import VueDataGridsProcessing from './components/vue-data-grids-processing.vue';
export default {
	components: {
		vueDataGridsSearch,
		VueDataGridsRppList,
		VueDataGridsPagination,
		VueDataGridsInfo,
		VueDataGridsThemesList,
		VueDataGridsProcessing,
	},
	name: 'vue-data-grids',
	mounted() {
		if (this.serverSide) {
			this.startTableDataFetching();
		}
	},
	props: {
		/**
       * is table fetching from api
       */
		serverSide: {
			type: Boolean,
			default: () => false,
		},
		/**
       * ajax configuration in case of server side table
       */
		ajax: {
			type: Object,
			default: () => VueDataGridsDefaultAjaxConfig,
		},
		/**
       * columns
       */
		columns: {
			type: Array,
			required: true,
		},
		/**
       * data tables rows
       */
		rows: {
			type: Array,
			default: () => [],
		},
		/**
       * table classes
       */
		classes: {
			type: Object,
			default: () => {
				return {};
			},
		},

		/**
       * result per page
       */
		rpp: {
			type: Number,
			default: () => VueDataGridsDefaultRPP,
		},
		/**
       * result per page options
       */
		rpp_list: {
			type: Array,
			default: () => VueDataGridsDefaultRPPList,
		},
		/**
       * is table responsive
       *
       */
		responsive: {
			type: Boolean,
			default: () => false,
		},
		/**
       * initial sort column
       */
		sortBy: {
			type: String,
			default: () => null,
		},
		/**
       * add checkbox to table
       */
		checkbox: {
			type: Boolean,
			default: () => false,
		},
		/**
       * on select rows callback
       */
		onSelectRows: {
			type: Function,
		},
		/**
       * error message
       * incase of ajax request failure
       */
		errorMessage: {
			type: String,
			default: () => 'Oops! something went wrong',
		},
		/**
       * on update callback
       */
		onQueryUpdate: {
			type: Function,
		},
	},

	computed: {
		/**
       * table classes container
       */
		tableClasses() {
			return {
				...VueDataGridsDefaultClasses,
				...this.classes,
			};
		},

		/**
       * all searchable columns
       */
		searchableColumns() {
			let searchable = [];
			this.columns.map((col) => {
				if (col.searchable) {
					searchable.push(col);
				}
			});

			return searchable;
		},

		/**
       * rows data source
       */
		dataSource() {
			let data = this.rows;
			if (this.serverSide) {
				data = this.serverSideData.data;
			}

			if (this.serverSide && !this.ajax.once) {
				return data;
			} else {
				try {
					let search = this.query.search;
					if (search && this.searchableColumns.length) {
						data = searchTableData(data, this.searchableColumns, search);
					}

					/**
             * if data is sorted
             */
					if (this.query.sort_by) {
						data = sortTableData(
							data,
							this.query.sort_by,
							this.query.sort_direction
						);
					}
					return data;
				}catch(err) {
					console.log(err);
					return data;
				}
			}
		},

		/**
       * get render data
       */
		renderData() {
			if (this.serverSide && !this.ajax.once) {
				return this.dataSource;
			}
			let data = this.dataSource;

			let start = (this.query.page - 1) * this.query.rpp;

			let end = start + this.query.rpp;

			return data.slice(start, end);
		},
		/**
       * total rows count
       */
		totalRowsCount() {
			if (this.serverSide) {
				if (this.ajax.once) {
					this.serverSideData.data.length;
				} else {
					return this.serverSideData.total;
				}
			}
			return this.dataSource.length;
		},
		/**
       * detect if table is processing or not
       */
		isProcessing() {
			if (this.serverSide && this.serverSideData.status === LOADING) {
				return true;
			}
			return false;
		},
	},

	data() {
		return {
			query: {
				/**
           * query result per page
           */
				rpp: this.rpp,
				/**
           * query search
           */
				search: null,
				/**
           * query current page
           */
				page: 1,
				/**
           * sort by
           */
				sort_by: this.getSortByColumn(this.sortBy),
				/**
           * sort direction
           */
				sort_direction: 'asc',
				/**
           * selected rows
           */
				selected: [],
			},

			/**
         * table theme
         */
			theme: VueDataGridsDefaultTheme,
			/**
         * server side data in case of server side
         */
			serverSideData: {
				/* returned data */
				data: [],
				/** request status */
				status: IDLE,
				/* request error */
				error: null,
				/** total rows count */
				total: 0,
				/**
           * ajax request headers
           */
				headers: {},
				/** ajax request query params */
				params: {},
			},
		};
	},

	watch: {
		'query.selected': function () {
			if (this.onSelectRows) {
				this.onSelectRows(this.query.selected);
			}
		},
		'dataSource' : function() {
			this.query.selected = [];
			this.$refs.checkAllBox.checked = false;
		}
	},

	methods: {
		/**
       * convert column name to slot name
       *
       * e.g Hello World => HELLO_WORLD
       *
       * @param {Object} column
       * @return {String}
       */
		convertColumnNameToSlot(col) {
			return toSnakeCase(col.title);
		},
		/**
       * get the given path value from the given container
       *
       * @param {Object} row [container]
       * @param {String} col [path]
       * @param {any} $d [default value incase of not found]
       * @return {any}
       */
		getDataObjectValue(row, col, $d = null) {
			return get(row, col.data, $d);
		},
		/**
       * on searching table
       *
       * @param {string}
       */
		onSearch(value) {
			this.query.search = value;
			this.sendUpdateSignal();
		},
		/**
       * on changing number of result per page
       *
       * @param {Number}
       */
		onRppChange(rpp) {
			this.query.rpp = rpp;
			this.sendUpdateSignal();
		},
		/**
       * on page navigation
       *
       * @param {Number} page
       */
		onPageChange(page) {
			this.query.page = page;
			this.sendUpdateSignal();
		},
		/**
       * on theme change callback
       *
       * @param {String} theme
       */
		onThemeChange(theme) {
			this.theme = theme;
		},
		/**
       * sort table by the given column
       */
		sortingTableBy(col) {
			if (
				this.query.sort_by &&
          this.query.sort_by.title === col.title &&
          this.query.sort_direction === 'asc'
			) {
				this.query.sort_direction = 'desc';
			} else {
				this.query.sort_direction = 'asc';
			}
			this.query.sort_by = col;
			this.sendUpdateSignal();
		},
		/**
       * get sort by column
       *
       * @param {String} column
       * @return {Object}
       */
		getSortByColumn(column) {
			let sortByColumn = null;
			if (column === null) {
				return sortByColumn;
			}
			this.columns.map((col) => {
				if (col.title === column) {
					sortByColumn = col;
				}
			});
			return sortByColumn;
		},
		/**
       * check all rows
       *
       * @param {Event} event
       */
		checkAllRows(event) {
			if (event.target.checked) {
				this.query.selected = this.dataSource;
			} else {
				this.query.selected = [];
			}
		},
		/**
       * mark table as loading
       */
		markAjaxAsLoading() {
			this.serverSideData.status = LOADING;
			this.serverSideData.error = null;
		},
		/**
       * prepare ajax request query params
       * @param {Number} page [current page]
       * @return {String}
       */
		prepareQueryParams(page) {
			let params;
			params = prepareServerSideRequestParameter({
				...this.serverSideData.params,
				...this.ajax.params,
				page,
				rpp: this.query.rpp,
				search: this.query.search,
				sort_by: this.query.sort_by ? this.query.sort_by.data : null,
				sort_dir: this.query.sort_direction,
			});

			return params;
		},
		/**
       * start fetch from api end point
       */
		startTableDataFetching(page = 1) {
			if (!this.serverSide) {
				return;
			}
			let { url, data, total } = this.ajax;
			this.markAjaxAsLoading();
			let params = this.prepareQueryParams(page);
			fetch(url + params, {
				headers: this.ajax.headers,
				credentials: 'same-origin',
			})
				.then((res) => res.json())
				.then((json) => {
					this.serverSideData.data = data(json);
					this.serverSideData.status = SUCCEEDED;
					if (total) {
						this.serverSideData.total = total(json);
					}
				})
				.catch((err) => {
					console.log(err);
					this.serverSideData.error = err;
					this.serverSideData.status = FAILED;
				});
		},
		/**
       * send update signal on query update
       */
		sendUpdateSignal() {
			if (this.onQueryUpdate) {
				this.onQueryUpdate({
					query: this.query,
					ajax: this.ajax,
				});
			}
			if (this.serverSide && !this.ajax.once) {
				this.startTableDataFetching(this.query.page);
			}
		},
	},
};
</script>

<style>
  .vue__data-grids-table-container {
    position: relative;
  }
</style>

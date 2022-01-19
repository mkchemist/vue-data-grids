<template>
  <div id="app">
    <div class="container p-5 bg-white shadow">
     <!--  <vue-data-grids
        :columns="columns"
        sortBy="Name"
        :responsive="true"
        :onSelectRows="onSelectRows"
        :rpp_list="[20, 500, 1000]"
        :rpp="20"
        :serverSide="true"
        :ajax="ajax"
        :onQueryUpdate="onQueryUpdate"
        :checkbox="true"
      >
      </vue-data-grids> -->
      <vue-data-grids
        :columns="columns"
        sortBy="Name"
        :rows="rows"
        :responsive="true"
        :onSelectRows="onSelectRows"
        :rpp_list="[20, 500, 1000]"
        :rpp="20"
        :onQueryUpdate="onQueryUpdate"
        :checkbox="true"
      >
      </vue-data-grids>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueDataGrids from '@/vue-data-grids.vue';

export default Vue.extend({
	name: 'ServeDev',
	components: {
		VueDataGrids,
	},
	mounted() {
		fetch('https://api.instantwebtools.net/v1/passenger?page=0&size=100')
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				this.rows = data.data;
			});
	},
	data() {
		return {
			columns: [
				{
					title: 'ID',
					data: 'id',
					sortable: true
				},
				{
					title: 'Name',
					data: 'name',
					searchable:true,
					sortable:true
				},
        
			],
			rows: [],
			ajax: {
				url: 'http://localhost/projects/distx/public/api/users',
				data: (data) => {
					return data.data;
				},
				//total: (data) => data.totalPassengers,
				total: (data) => data.total,
				params: {
					api_token: 'UZpJMoeU9OtJLS7'
				},
			},
		};
	},

	methods: {
		onSelectRows(data) {
			console.log(data);
		},
		onQueryUpdate(config = {}) {
			//config.ajax.params.size = config.query.rpp;
			console.log(config);
		}
	},
});
</script>

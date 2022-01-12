<template>
  <div id="app">
    <div class="container p-5 bg-white shadow">
      <vue-data-grids
        :columns="columns"
        sortBy="Name"
        :responsive="true"
        :onSelectRows="onSelectRows"
        :rpp_list="[20, 500, 1000]"
        :rpp="20"
        :serverSide="true"
        :ajax="ajax"
        :onQueryUpdate="onQueryUpdate"
      >
      </vue-data-grids>
    </div>
  </div>
</template>

<script>
  import Vue from "vue";
  import VueDataGrids from "@/vue-data-grids.vue";

  export default Vue.extend({
    name: "ServeDev",
    components: {
      VueDataGrids,
    },
    mounted() {
      /*  fetch("https://api.instantwebtools.net/v1/passenger?page=0&size=10")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        this.rows = data
      }) */
    },
    data() {
      return {
        columns: [
          {
            title: "ID",
            data: "id",
            searchable: true,
            sortable: true,
          },
          {
            title: "Name",
            data: "name",
            searchable: true,
            sortable: true,
          },
          {
            title: "Country",
            data: "country",
            searchable: true,
            sortable: true,
          },
          {
            title: "Trips",
            data: "trips",
            searchable: true,
            sortable: true,
          },
        ],
        rows: [],
        ajax: {
          url: "https://api.instantwebtools.net/v1/airlines",
          data: (data) => {
            return data;
          },
          //total: (data) => data.totalPassengers,
          once: true,
          params: {
            size: 20,
          },
        },
      };
    },

    methods: {
      onSelectRows(data) {
        console.log(data);
      },
      onQueryUpdate(config = {}) {
        config.ajax.params.size = config.query.rpp;
      }
    },
  });
</script>

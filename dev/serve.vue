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
        {
          title: "Specialty",
          data:"specialty",
          searchable:true,
          sortable:true
        },
        {
          title: "Workplace",
          data:"workplace.name",
          searchable:true,
          sortable:true
        },
        {
          title: "Plans",
          data:"plans"
        },
        {
          title: "Address",
          data:"address",
          searchable:true,
          sortable:true
        },
        {
          title: "Brick",
          data:"brick",
          searchable:true,
          sortable:true
        },
        {
          title: "Area",
          data:"area",
          searchable:true,
          sortable:true
        },
        {
          title: "District",
          data:"district",
          searchable:true,
          sortable:true
        },
        {
          title: "Territory",
          data:"territory",
          searchable:true,
          sortable:true
        },
        ],
        rows: [],
        ajax: {
          url: "http://localhost:8080/api/users",
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
      }
    },
  });
</script>

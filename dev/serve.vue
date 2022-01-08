<template>
  <div id="app">
    
    <div class="container p-5 bg-white shadow">
      <vue-data-grids
        :columns="columns"
        :rows="rows"
        sortBy="Name"
        :responsive="true"
        :onSelectRows="onSelectRows"
        :rpp_list="[1,2,10]"

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
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => (this.rows = data));
  },
  data() {
    return {
      columns: [
        {
          title: "ID",
          data: "id",
          searchable: true,
          sortable: true
        },
        {
          title: "Name",
          data:"name",
          searchable: true,
          sortable: true
        },
        {
          title: "Email",
          data: "email",
          searchable: true,
          sortable: true
        },
        
        
      ],
      rows: [],
     
    };
  },

  methods: {
    onSelectRows(data) {
      console.log(data)
    }
  }
});
</script>

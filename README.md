# Vue Data Grids

> Simple data Data Grids for **Vue.js** **_version 2_**
> , this package require **Bootstrap** framework for styling table.

## Table of contents:
- [Introduction](#introduction)
- [Get started](#install)
- [Quick start](#quick-start)
- [API OPTIONS](#api-options)
- [Slots](#table-slots)
  - [Buttons slot](#buttons-slot)
  - [Table header and data slots](#table-header-and-data-slots)
- [Server Side Mode](#server-side-mode)
  - [Query Params](#query-params)
  - [Send Update Signal](#send-update-signal)
- [Author](#author)


### Introduction
---------------------------
Managing tables in [Vue.Js](#https://vuejs.org/) can be a cumbersome especially in case of large data set, despite of existences of a lot of awesome ready to use solution **[Awesome Vue.js](https://github.com/vuejs/awesome-vue)** but some of theme contain a lot of complex apis and need a boilerplate to run and get expected result, in this try , i did my best to make it easy as possible to get started with your tables either in **client side** mode or **server side mode**, i hope you enjoy it.

### Get started

[&uarr; back to table of contents](#table-of-contents)

```npm
npm i --save-dev vue-data-grids
```

### Quick start

[&uarr; back to table of contents](#table-of-contents)

- Loading component file
  In browser

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Vue Data Grids</title>
    </head>
    <body>
      <script src="path/to/libs/vue-data-grids.min.js"></script>
      <script>
        //register VueDataGrids globally
        Vue.component("vue-data-grids", VueDataGrids);

        new Vue({
          components: {
            // register inside component
            VueDataGrids,
          },
        });
      </script>
    </body>
  </html>
  ```

  in single file component

  ```js
  <template>

  </template>
  <script>
  import VueDataGrids from "vue-data-grids";
  export default {
    components: {
      VueDataGrids
    }
  }
  </script>
  ```

- adding component to your html template
  ```html
  <template>
    <div>
      <vue-table-component
        :columns="columns"
        :rows="rows"
      ></vue-table-component>
    </div>
  </template>
  <script>
    import VueDataGrids from "vue-data-grids";
    export default {
      components: {
        VueDataGrids,
      },
      data() {
        return {
          columns: [
            {
              title: "Name",
              data: "name",
              searchable: true,
              sortable: true,
            },
            {
              title: "Email",
              data: "email",
              searchable: true,
            },
          ],
          rows: [
            { id: 1, name: "Jon Doe", email: "jon_doe@mail.com" },
            { id: 1, name: "Jane Doe", email: "jane_doe@mail.com" },
          ],
        };
      },
    };
  </script>
  ```

## API options

[&uarr; back to table of contents](#table-of-contents)

```js
  options = {

    /**
     * is table in server side mode
     *
     * default :false
     */
    serverSide: Boolean,
    /**
     * ajax configurations
     *
     */
    ajax: {
      /**
       * api url
       */
      url: String,
      /**
       * function to return
       * total rows count
       * to be used in pagination
       *
       * e.g
       * data => data.total
       *
       * default: 0
       */
      total: Function,
      /**
       * headers to be sent with
       * every api request
       *
       *
       * default : {}
       */
      headers: Object,
      /**
       * query params to be sent
       * with every api request
       *
       * default : {}
       */
      params: Object,
      /**
       * to load data one time only
       * this option is used when load all data in one time
       * to apply pagination, sort and search in client side
       * without fetching api every time you update your table
       *
       * default false
       */
      once: Boolean
    },
    /**
     * table columns
     */
    columns: [
      {
        /**
         * table column title
         *
         */
        title:String,
        /**
         * table column data
         *
         * e.g
         * string => 'name'
         * function => (row) => row.name
         */
        data: String|Function,
        /**
         * is column searchable
         *
         */
        searchable: Boolean,
        /**
         * is column sortable
         *
         */
        sortable: Boolean

      }
    ],
    /**
     * table rows
     *
     * default: []
     */
    rows: Array<Object>,
    /**
     * table result per page
     *
     * default: 10
     */
    rpp: Number,
    /**
     * table result per page options
     *
     * default: [10,20,50,100]
     */
    rpp_list:Array<Number>,
    /**
     * is table responsive
     *
     */
    responsive: Boolean,
    /**
     * sort data by
     *
     * default : null
     */
    sortBy: String,
    /**
     * add checkbox to table
     *
     * default:false
     */
    checkbox:Boolean,
    /**
     * callback invoked when
     * select row
     *
     * default: null
     */
    onSelectRows:Function,
    /**
     * error message in server side mode
     *
     * default : Oops! something went wrong
     */
    errorMessage: String,
    /**
     * on Query Update
     *
     * callback that invoked when table updated
     * it will pass a config parameter to the given function
     * config parameter : {
     *    query: table query,
     *    ajax: ajax configuration
     * }
     */
    onQueryUpdate: Function
  }
```

## Table Slots

[&uarr; back to table of contents](#table-of-contents)

#### Buttons slot

[&uarr; back to table of contents](#table-of-contents)

---

```html
<template v-slot:table-buttons>
  <button>Do any action</button>
</template>
```

#### Table Header And Data slots

[&uarr; back to table of contents](#table-of-contents)

---

How slot work ?
Table headers slot **_all white spaces in column title replaced by \_ and_**.

```
    "My Name Is" => "my_name_is"
```

> if you want to add slot in table headers simply add suffix **_\_col_** to end of name.

```js
let columns = [
  {
    title: "Email",
    data: "email"
  },
  {
    title: "User Full Name",
    data:"user.full_name"
  }
]

// table header slot
<template v-slot:email_col></template>
<template v-slot:user_full_name_col></template>

// table data slot
<template v-slot:email="data"></template>
<template v-slot:user_full_name="{data}"></template>

```

## Server Side Mode

[&uarr; back to table of contents](#table-of-contents)

---

when using serve side mode , vue data grids will send query parameters with every request to api .

### Query params :

[&uarr; back to table of contents](#table-of-contents)

```ts
const query_params = {
  /**
   * page number
   *
   * @var number [default  1]
   */
  page: 1,
  /**
   * result per page
   *
   * @var number [default 10]
   */
  rpp: 10,
  /**
   * sort column name
   *
   * @var string [default null]
   */
  sort_by: "name",
  /**
   * sort direction
   * directions [asc, desc]
   *
   * @var string [default  asc]
   *
   */
  sort_dir: "asc",
  /**
   * search keyword
   *
   * @var string [default null]
   */
  search: "something",
};
```

### Send update signal

[&uarr; back to table of contents](#table-of-contents)

> Incase of doing any action and want to reload table, simply add ref to vue-data-grids component and then call
> method **sendUpdateSignal**

#### Example

```html
<template>
  <div>
    <vue-data-grids
      :columns="columns"
      :ajax="ajax"
      :serverSide="true"
      :onSelectRows="onSelectRows"
      ref="dataTable"
    >
      <template v-slot:table-buttons>
        <button @click="do_action">do action</button>
      </template>
    </vue-data-grids>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        /**
         * selected table rows
         */
        selectedRows: [],
        /**
         * table columns
         */
        columns: [
          {
            title: "Name",
            data: "name",
          },
        ],
        ajax: {
          // ajax url
          url: "/host/api_point",
          // where to get table data
          data: (data) => data.data,
          // where to get total rows
          total: (data) => data.total,
        },
      };
    },

    methods: {
      /**
       * on selecting rows callback
       *
       * @param {Array} rows
       */
      onSelectRows(rows) {
        this.selectedRows = rows;
      },
      /**
       * do action with selected rows
       */
      do_action() {
        // do any action
        // single update signal to notify
        // vue-data-grids with new changes of data
        // and reload data again
        this.$refs.dataTable.sendUpdateSignal();
      },
    },
  };
</script>
```
### Author 
[&uarr; back to table of contents](#table-of-contents)

Mohamed Kamal

```PHP Laravel developer in love with JavaScript especially Vue.js, React.js and Electron.js```

[Email](mailto:m.k_chemist@yahoo.com) , [Twitter](https://twitter.com/mk_chemist) , [LinkedIn](https://www.linkedin.com/in/mohamed-kamal-032258191/)
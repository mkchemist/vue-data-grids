# Vue Data Grids

> Simple data Data Grids for **Vue.js**
> , this package require **Bootstrap** framework for styling table.

### Install

```npm
npm i --save-dev vue-data-grids
```

### Quick start

- Loading component file
  In browser

    ```html
      
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Vue Data Grids</title>
    </head>
    <body>
        
        <script src="path/to/libs/vue-data-grids.min.js"></script>
        <script>

            //register VueDataGrids globally
            Vue.component('vue-data-grids', VueDataGrids)

            new Vue({
                components: {
                    // register inside component
                    VueDataGrids
                }
            })
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
        VueDataGrids
      },
      data() {
        return {
          columns: [
            {
              title: 'Name',
              data:'name',
              searchable:true,
              sortable:true
            },
            {
              title: 'Email',
              data: 'email',
              searchable:true
            }
          ],
          rows: [
            {id: 1, name: 'Jon Doe', email: 'jon_doe@mail.com'},
            {id: 1, name: 'Jane Doe', email: 'jane_doe@mail.com'},
          ]
        }
      }
    }
    </script>
  ```

## Options
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

## slots
- Buttons slot
```html
  <template v-slot:table-buttons></template>
```
- Table Header And Data slots
  How slot work ?
  Table headers slot :all  white spaces in column title replaced by _ and.
  ```
      "My Name Is" => "my_name_is"
  ```
  > if you want to add slot in table header simpler add suffix _col to end of name.


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
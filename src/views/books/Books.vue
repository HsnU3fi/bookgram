<template>
  <div>
    <v-container class="fill-height" fluid>

      <v-row justify="center" align="center">
        <v-card-title style="color: white;margin-top: 20px">
          <span class="text-h5">Books</span>
        </v-card-title>
      </v-row>
      <v-row justify="start" align="start">


        <v-btn
            style="margin-left: 25px;margin-bottom: 10px"
            elevation="12"
            fab
            dark
            to="/add-book"
            title="Add Book"
            color="#55BE4C"
            height="45"
            width="45"
        >

          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>

      </v-row>
      <v-col md="12" cols="12">

        <v-data-table
            @click:row="handleClick"
            :headers="headers"
            :items="desserts"
            item-key="name"
            style="background-color: #2C2F37;"
            class="elevation-15"
            :search="search"
            color="#55BE4C"
            loading-text="loading...."
            dark
            hide-default-footer
        >
          <template v-slot:top>
            <v-text-field
                v-model="search"
                filled
                dense
                color="#55BE4C"
                label="Search (UPPER CASE ONLY)"
            ></v-text-field>
          </template>
          <template v-slot:body.append>
            <tr>
              <td></td>
              <td>
                <v-text-field
                    v-model="calories"
                    type="number"
                    label="Less than"
                ></v-text-field>
              </td>
              <td colspan="4"></td>
            </tr>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn style="margin: 5px" dark color="#55BE4C">
              <v-icon
                  small
                  class="mr-2"
                  @click="editItem(item)"
              >
                mdi-pencil
              </v-icon>
            </v-btn>
            <v-btn style="margin: 5px" dark color="red">
              <v-icon
                  small
                  @click="deleteItem(item)"
              >
                mdi-delete
              </v-icon>
            </v-btn>
<!--            <v-btn style="margin: 5px" dark color="red">-->
<!--              <v-icon-->
<!--                  small-->
<!--                  @click="deleteItem(item)"-->
<!--              >-->
<!--                mdi-delete-->
<!--              </v-icon>-->
<!--            </v-btn>-->
           </template>

        </v-data-table>
      </v-col>
    </v-container>
  </div>
</template>

<script>


export default {

  data() {
    return {
      search: '',
      calories: '',
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: 1,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: 1,
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: 7,
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: 8,
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: 16,
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: 0,
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: 2,
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: 45,
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: 22,
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: 6,
        },
      ],
    }
  },
  computed: {
    headers() {
      return [
        {
          text: 'Name',
          align: 'center',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Name',
          align: 'center',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Name',
          align: 'center',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Name',
          align: 'center',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Actions', value: 'actions', align: 'center',
          sortable: false
        },


      ]
    },
  },
  methods: {
      handleClick(row) {
      // set active row and deselect others
      this.desserts.map((item, index) => {
        item.selected = item === row

        this.$set(this.desserts, index, item)
      })

      // or just do something with your current clicked row item data
      console.log(row)
      window.location.href = "edit-book/" +row
    },
    filterOnlyCapsText(value, search, item) {
      return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search) !== -1
    },
  },
}
</script>

<style scoped>

</style>
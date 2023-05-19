<template>
  <div>
    <v-container class="fill-height" fluid>

      <v-row justify="center" align="center">
        <v-card-title style="color: white;margin-top: 20px">
          <span class="text-h6">Books</span>
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
            :headers="headers"
            :items="items"
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

          <template v-slot:item.view="{ item }">
            <v-btn style="margin: 5px" fab small dark color="#F2C83A">
              <v-icon
                  small
                  @click="viewItem(item)"
              >
                mdi-eye
              </v-icon>
            </v-btn>
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
                  class="mr-2"
                  @click="deleteItem(item); dialogDelete=true"
              >
                mdi-delete
              </v-icon>
            </v-btn>


          </template>

        </v-data-table>
      </v-col>
      <v-row justify="center">

        <v-dialog
            persistent
            v-model="dialog"
            max-width="450"

        >
          <v-card color="#2C2F37">
            <v-row justify="start" align="start">
              <img loading="lazy" style="margin-left: 7%" width="100" height="200"
                   src="../../assets/img/addbook.png"
                   alt="">
            </v-row>
            <v-card-text class="text-h7 " style="color: white">
              Book Name :
              <span style="font-weight: bold;font-size: 15px;color: #35D01C">
              {{ view_item.name || "----" }}
            </span>
            </v-card-text>

            <v-card-text class="text-h7" style="color: white">
              Author :
              <span style="font-weight: bold;font-size: 13px;color: #35D01C">
               {{ view_item.author }}
               </span>
            </v-card-text>
            <v-card-text class="text-h7" style="color: white">
              Page Number :
              <span style="font-weight: bold;font-size: 13px;color: #35D01C">

               {{ view_item.page_number }}
               </span>

            </v-card-text>
            <v-card-text class="text-h7" style="color: white">
              Genre :
              <span style="font-weight: bold;font-size: 13px;color: #35D01C">
                {{ view_item.genre }}
               </span>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>


              <v-btn
                  color="#35D01C"
                  text
                  @click="dialog = false"
              >
                <span style="font-size: 15px;font-weight: bold">
                  ok
                </span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>


      <v-row justify="center">

        <v-dialog
            persistent
            v-model="dialogDelete"
            max-width="450"

        >
          <v-card height="160"
                  color="#2C2F37"
                  style="border: 2px solid #35D01C; border-radius: 8px"
                  elevation="24">

            <v-card-title>
              <v-row
                  style="margin-top: 20px; color: white"
                  justify="center"
                  align="center"
              >
            <span style="font-weight: bold; font-size: 80%">
              Are you sure delete item
              <strong style="color: #35D01C;; font-size: 100%"
              >{{ delete_item.name || '---' }}</strong
              >
              ?
            </span>
              </v-row>
            </v-card-title>
            <v-card-actions style="margin-top: 20px">
              <v-row justify="center" align="center">
                <v-btn @click="dialogDelete = false" dark text width="75" color="red">
                  <span style="font-weight: bold"> Cancel </span>
                </v-btn>
                <div style="width: 20px"></div>
                <v-btn @click="acceptDelete" text dark width="80" color="#35D01C">
                  <span style="font-weight: bold"> Yes </span>
                </v-btn>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>
  </div>
</template>

<script>


export default {

  data() {
    return {
      search: '',
      items: undefined,
      dialog: false,
      dialogDelete: false,
      delete_item: '',
      view_item: ''
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
          text: 'Author',
          align: 'center',
          sortable: false,
          value: 'author',
        },
        {
          text: 'Isbn',
          align: 'center',
          sortable: false,
          value: 'isbn',
        },

        {
          text: 'Actions', value: 'actions', align: 'center',
          sortable: false
        },
        {
          text: 'view', value: 'view', align: 'center',
          sortable: false
        },


      ]
    },
  },
  methods: {
    editItem(item) {
      window.location.href = "edit-book/" + JSON.stringify(item)
    },
    viewItem(item) {
      this.view_item = item
      this.dialog = true

    },
    deleteItem(item) {
      this.dialogDelete = true
      this.delete_item = item
    },
    acceptDelete(item) {

    },

    getItemLocalStorage() {
      this.items = JSON.parse(localStorage.getItem('books'))

    },
    filterOnlyCapsText(value, search, item) {
      return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search) !== -1
    },
  },
  created() {
    this.getItemLocalStorage()
  }
}
</script>

<style scoped>

</style>
<template>
  <div>
    <v-container class="fill-height" fluid>

      <v-row justify="center" align="center">
        <v-card-title style="color: white;margin-top: 20px">
          <span class="text-h6">Authors</span>
        </v-card-title>
      </v-row>
      <v-row justify="start" align="start">


        <v-btn
            style="margin-left: 25px;margin-bottom: 10px"
            elevation="12"
            fab
            dark
            to="/add-authors"
            title="Add Author"
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
            v-show="no_data_table"
            item-key="name"
            style="background-color: #2C2F37;"
            class="elevation-15"
            :search="search"
            color="#55BE4C"
            loading-text="loading...."
            hide-default-footer
            @page-count="pageCount = $event"
            :page.sync="page"
            dark
        >

          <template v-slot:top>
            <v-text-field
                v-model="search"
                filled
                dense
                color="#55BE4C"
                label="Search"
            ></v-text-field>
          </template>

          <template v-slot:item.view="{ item }">
            <v-btn @click="viewItem(item)"
                   style="margin: 5px" fab small dark color="#F2C83A">
              <v-icon
                  small
              >
                mdi-eye
              </v-icon>
            </v-btn>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-btn @click="editItem(item)"
                   style="margin: 5px" dark color="#55BE4C">
              <v-icon
                  small
                  class="mr-2"
              >
                mdi-pencil
              </v-icon>
            </v-btn>
            <v-btn @click="deleteItem(item)"
                   style="margin: 5px" dark color="red">
              <v-icon
                  small
                  class="mr-2"
              >
                mdi-delete
              </v-icon>
            </v-btn>


          </template>

        </v-data-table>
        <v-pagination
            v-model="page"
            :length="pageCount"
            color="#55BE4C"
        ></v-pagination>
      </v-col>
      <v-row justify="center">

        <v-dialog
            persistent
            v-model="dialog"
            max-width="450"

        >
          <v-card color="#2C2F37">
            <v-row justify="start" align="start">
              <img loading="lazy" style="margin-left: 7%;padding-top: 20px;border-radius: 5px" width="150" height="200"
                   :src="view_item.profile_picture"
                   alt="">
            </v-row>
            <v-card-text class="text-h7 " style="color: white;padding-top: 20px">
              Author :
              <span style="font-weight: bold;font-size: 15px;color: #35D01C">
              {{ view_item.full_name || "----" }}
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
                <v-btn @click="acceptDelete()" text dark width="80" color="#35D01C">
                  <span style="font-weight: bold"> Yes </span>
                </v-btn>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-row justify="center">
          <img v-if="no_data" loading="lazy" style="margin-left: 7%;" height="600"
               src="../../assets/img/nodata.png"
               alt="">

        </v-row>
      </v-row>
    </v-container>
    <loading1 :value="overlay"/>

  </div>
</template>

<script>
import Loading1 from "@/components/loading/Loding";


export default {
  components: {Loading1},

  data() {
    return {
      page: 1,
      pageCount: 0,
      search: '',
      items: undefined,
      dialog: false,
      dialogDelete: false,
      delete_item: '',
      view_item: '',
      no_data: false,
      no_data_table: true,
      overlay: true
    }
  },
  computed: {
    headers() {
      return [
        {
          text: 'Full Name',
          align: 'center',
          sortable: false,
          value: 'full_name',
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
      window.location.href = "edit-authors/" + item.id
    },
//======================================================================================================================
    viewItem(item) {
      this.view_item = item
      this.dialog = true
    },
//======================================================================================================================
    deleteItem(item) {
      this.dialogDelete = true
      this.delete_item = item
    },
//======================================================================================================================
    acceptDelete() {
      this.items.splice(this.delete_item, 1)
      console.log(typeof this.items)
      localStorage.setItem("authors", JSON.stringify(this.items));
      this.dialogDelete = false
      this.getItemLocalStorage()
    },
//======================================================================================================================
    getItemLocalStorage() {
      this.items = JSON.parse(localStorage.getItem('authors'))
      if (this.items === null || Object.keys(this.items).length === 0) {
        this.no_data = true
        this.no_data_table = false

      }
    },
//======================================================================================================================
  },
  created() {
    this.getItemLocalStorage()
    setTimeout(() => {
      this.overlay = false
    }, 3000)


  }
}
</script>

<style scoped>

</style>
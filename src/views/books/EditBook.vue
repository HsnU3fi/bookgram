<template>
  <div>
    <v-container class="fill-height"
                 fluid>
      <v-row justify="center" align="center">
        <v-card-title style="color: white;margin-top: 20px">
          <span class="text-h5">Edit Book</span>
        </v-card-title>
      </v-row>
      <v-row justify="start" align="start" style="padding: 20px">

        <v-col md="6" cols="12">
          <v-card color="#2C2F37" style="border-radius: 6px" height="600" class="scroll">
            <v-col md="12" cols="12">


              <v-row style="padding-top: 30px" justify="center" align="center">
                <v-col md="6"
                       cols="12"
                >
                  <v-text-field
                      dark
                      v-model="items.name"
                      filled
                      label="Name"
                      dense
                      color="#55BE4C"

                  >

                  </v-text-field>

                </v-col>
                <v-col md="6"
                       cols="12"
                >
                  <v-text-field
                      dark
                      v-model="items.genre"
                      filled
                      label="Genre"
                      dense
                      color="#55BE4C"

                  >

                  </v-text-field>
                </v-col>

              </v-row>


              <v-row style="padding-top: 30px" justify="center" align="center">
                <v-col md="6"
                       cols="12"
                >
                  <v-text-field
                      dark
                      v-model="items.isbn"
                      filled
                      label="Isbn"
                      dense
                      color="#55BE4C"

                  >

                  </v-text-field>

                </v-col>
                <v-col md="6"
                       cols="12"
                >
                  <v-autocomplete
                      v-model="items.genre"
                      :items="items"
                      dense
                      dark
                      filled
                      label="genre"
                  ></v-autocomplete>

                </v-col>

              </v-row>

              <v-row style="padding-top: 30px" justify="center" align="center">
                <v-col md="6"
                       cols="12"
                >
                  <v-text-field
                      dark
                      v-model="items.page_number"
                      filled
                      label="Page Number"
                      dense
                      color="#55BE4C"

                  >

                  </v-text-field>

                </v-col>
                <v-col md="6"
                       cols="12"
                >
                  <v-file-input dark filled dense color="#55BE4C" clearable label="Image "></v-file-input>


                </v-col>

              </v-row>

            </v-col>


            <v-card-actions style="margin-top: 5px">
              <v-spacer></v-spacer>

              <v-btn
                  dark
                  width="80"
                  color="#55BE4C"
                  style="margin-right: 10px"
                  @click="createProjects()"
              >
<span style="font-weight: bold">
  Submit
</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col md="6" cols="12">
          <img v-if="image" loading="lazy" style="margin-left: 7%" width="90%" height="600"
               src="../../assets/img/addbook.png"
               alt="">
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

export default {
  name: "CreateProject",
  data: () => ({
    image: false,
    items: undefined,
  }),
//======================================================================================================================
  methods: {

//======================================================================================================================
    onResize() {
      this.image = window.innerWidth < 960;
      this.image = this.image !== true;
    },
    getData() {
      this.items = JSON.parse(this.$route.params.data)
    }
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, {passive: true});
  },
  created() {
    this.getData()
  }
}
</script>

<style scoped>

.scroll {
  overflow-y: scroll
}

/* width */
::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #55BE4C;
  border-radius: 10px;
}
</style>
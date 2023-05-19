<template>
  <div>
    <v-container class="fill-height"
                 fluid>
      <v-row justify="center" align="center">
        <v-card-title style="color: white;margin-top: 20px">
          <span class="text-h5">Edit Author</span>
        </v-card-title>
      </v-row>
      <v-row justify="start" align="start" style="padding: 20px">

        <v-col md="6" cols="12">
          <v-card color="#2C2F37" style="border-radius: 6px" height="600" class="scroll">
            <v-col md="12" cols="12">


              <v-col md="12"
                     cols="12"
              >
                <v-text-field
                    dark
                    v-model="items.full_name"
                    filled
                    label="Full Name"
                    dense
                    color="#55BE4C"

                >

                </v-text-field>

              </v-col>


              <v-col md="12"
                     cols="12"
              >

                <v-file-input
                    v-model="image_author"

                    label="File input"
                    placeholder="Select your image"
                    prepend-icon="mdi-camera"
                    dark filled dense color="#55BE4C" clearable
                    :show-size="100"
                >
                </v-file-input>


              </v-col>




            </v-col>


            <v-card-actions style="margin-top: 5px">
              <v-spacer></v-spacer>

              <v-btn
                  dark
                  width="80"
                  color="#55BE4C"
                  style="margin-right: 10px"
                  @click="saveBookInLocalStorage()"
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
               src="../../assets/img/addAuthor.png"
               alt="">
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

export default {
  data: () => ({
    text: "",
    items:undefined,
    image: false,
    full_name: "",
    image_author: undefined,
    authors: [],

  }),
//======================================================================================================================
  methods: {
    saveBookInLocalStorage() {
//       console.log('this.name')
//       console.log(this.name)
//       const reader = new FileReader();
//       let baseString;
//       reader.onloadend = function () {
//         baseString = reader.result;
//         console.log(baseString)
//         this.img=baseString
//       };
// console.log(baseString)
//       this.img = baseString
//       console.log('this.img')
//       console.log(this.img)
//       reader.readAsDataURL(this.image_book)

      this.authors.push( {
        "full_name": this.full_name,

      })
      localStorage.setItem("authors", JSON.stringify(this.authors));

    },

//======================================================================================================================
    getData() {
      this.items = JSON.parse(localStorage.getItem('authors'))

    },
//======================================================================================================================
    onResize() {
      this.image = window.innerWidth < 960;
      this.image = this.image !== true;
    },
//======================================================================================================================
  },
  created() {
    this.getData()
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, {passive: true});
  },
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
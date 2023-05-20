<template>
  <div>
    <v-container class="fill-height"
                 fluid>
      <v-row justify="center" align="center">
        <v-card-title style="color: white;margin-top: 20px">
          <span class="text-h5">Add Book</span>
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
                      v-model="name"
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
                      v-model="genre"
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
                      v-model="isbn"
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
                      v-model="author"
                      :items="items_author"
                      item-text="full_name"
                      item-value="full_name"
                      dense
                      dark
                      filled
                      label="Author"
                  ></v-autocomplete>

                </v-col>

              </v-row>

              <v-row style="padding-top: 30px" justify="center" align="center">
                <v-col md="6"
                       cols="12"
                >
                  <v-text-field
                      dark
                      v-model="page_number"
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

                  <v-file-input
                      v-model="image_book"

                      label="File input"
                      placeholder="Select your image"
                      prepend-icon="mdi-camera"
                      dark filled dense color="#55BE4C" clearable
                      :show-size="100"
                  >
                  </v-file-input>


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
               src="../../assets/img/addbook.png"
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
    image: false,
    name: "",
    genre: "",
    page_number: "",
    authors: "",
    author: "",
    isbn: "",
    image_book: undefined,
    items_author:[],
    books: [],

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


      this.books.push({
        "id": Math.random().toString(16).slice(2),
        "name": this.name,
        "author": this.author,
        "genre": this.genre,
        "isbn": this.isbn,
        "page_number": this.page_number,
      })
      localStorage.setItem("books", JSON.stringify(this.books));

    },

//======================================================================================================================
    getItemLocalStorage() {
      let getItem = JSON.parse(localStorage.getItem('books'))
      if (getItem.length > 0) {
        for (let i in getItem) {
          this.books.push(getItem[i])
        }
      }
    },


//======================================================================================================================
    getItemAuthor() {
      console.log('this.items_author')

      this.items_author = JSON.parse(localStorage.getItem('authors'))
      console.log(this.items_author)
      console.log('this.items_author')

    },
//======================================================================================================================
    onResize() {
      this.image = window.innerWidth < 960;
      this.image = this.image !== true;
    },
//======================================================================================================================
  },
  created() {
    this.getItemAuthor()
    this.getItemLocalStorage()
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
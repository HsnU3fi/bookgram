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
                      :rules="[FieldValid.required]"
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
                      :rules="[FieldValid.required]"
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
                <v-col md="4"
                       cols="12"
                >
                  <v-text-field
                      :rules="[FieldValid.required]"
                      dark
                      v-model="page_number"
                      filled
                      label="Page Number"
                      dense
                      color="#55BE4C"

                  >

                  </v-text-field>

                </v-col>
                <v-col md="4"
                       cols="12"
                >
                  <v-text-field
                      :rules="[FieldValid.required]"
                      dark
                      v-model="isbn"
                      filled
                      label="Isbn"
                      dense
                      color="#55BE4C"
                  >

                  </v-text-field>

                </v-col>
                <v-col md="4"
                       cols="12"
                >

                  <v-autocomplete
                      :rules="[FieldValid.required]"
                      v-model="author"
                      :items="items_author"
                      item-text="full_name"
                      item-value="full_name"
                      dense
                      dark
                      filled
                      label="book"
                  ></v-autocomplete>

                </v-col>
              </v-row>
              <v-row justify="center" align="center">
                <v-col md="12"
                       cols="12"
                >
                  <v-file-input
                      :rules="PicValid"
                      v-model="image_book"
                      @change="onFileChange"
                      label="File input"
                      accept="image/png, image/jpeg, image/bmp"
                      placeholder="Select your image"
                      prepend-icon="mdi-camera"
                      dark filled dense color="#55BE4C" clearable
                  >
                  </v-file-input>
                  <img :src="imageUrl" style="border-radius: 5px" width="150" height="180" alt=""/>
                </v-col>
              </v-row>
            </v-col>


            <v-card-actions>
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
    items: undefined,
    image: false,
    full_name: "",
    image_book: undefined,
    books: [],
    edit_item: undefined,
    name: undefined,
    genre: undefined,
    page_number: undefined,
    isbn: undefined,
    author: undefined,
    items_author: undefined,
    FieldValid: {
      required: value => !!value || 'Field is required',
    },
    PicValid: [
      value => !value || value.size < 100000 || 'Picture size should be less than 100 KB!',
    ],
    imageUrl: undefined

  }),
//======================================================================================================================
  methods: {
    saveBookInLocalStorage() {
              this.items.push({
                "id": this.edit_item.id,
                "name": this.name,
                "img": this.imageUrl  ,
                "author": this.author,
                "genre": this.genre,
                "isbn": this.isbn,
                "page_number": this.page_number,
              })

      // )
      setTimeout(() => {
        localStorage.setItem("books", JSON.stringify(this.items))
        window.location.href = "/book"

      }, 1000)

    },
//======================================================================================================================
    createImage(file) {
      const reader = new FileReader();
      reader.onload = e => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    },
//======================================================================================================================
    onFileChange(file) {
      if (!file) {
        return;
      }
      this.createImage(file);
    },
//======================================================================================================================
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },

//======================================================================================================================
    getData() {
      this.items = JSON.parse(localStorage.getItem('books'))
      for (let i in this.items) {
        if (this.items[i].id === this.$route.params.id) {
          this.edit_item = this.items[i]
          this.name = this.items[i].name
          this.genre = this.items[i].genre
          this.author = this.items[i].author
          this.page_number = this.items[i].page_number
          this.isbn = this.items[i].isbn
          this.image_book = this.items[i].img;
          this.imageUrl = this.image_book
          this.items.splice(this.edit_item, 1)
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
    this.getData()
    this.getItemAuthor()
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
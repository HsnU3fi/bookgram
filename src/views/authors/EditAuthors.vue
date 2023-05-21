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
                      :rules="[FieldValid.required]"
                      dark
                      v-model="full_name"
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
                      :rules="PicValid"
                      v-model="image_author"
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


              </v-col>


              <v-card-actions style="margin-top: 5px">
                <v-spacer></v-spacer>

                <v-btn

                    dark
                    width="80"
                    color="#55BE4C"
                    style="margin-right: 10px"
                    @click="saveAuthorInLocalStorage()"
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
    items: undefined,
    image: false,
    full_name: "",
    image_author: undefined,
    authors: [],
    edit_item: undefined,
    FieldValid: {
      required: value => !!value || 'Field is required',
    },
    PicValid: [

      value => !value  || value.size < 100000 || 'Picture size should be less than 100 KB!',
    ],
    imageUrl:undefined,


  }),

//======================================================================================================================
  methods: {
    saveAuthorInLocalStorage() {
              this.items.push({
                "id": this.edit_item.id,
                "full_name": this.full_name,
                "profile_picture": this.imageUrl
              })
      setTimeout(() => {
        localStorage.setItem("authors", JSON.stringify(this.items))
        window.location.href = "/"
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
      this.items = JSON.parse(localStorage.getItem('authors'))
      for (let i in this.items) {
        if (this.items[i].id === this.$route.params.id) {
          this.edit_item = this.items[i]
          this.full_name = this.items[i].full_name
          this.image_author = this.items[i].profile_picture;
          this.imageUrl=this.image_author
          this.items.splice(this.edit_item, 1)
        }
      }
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
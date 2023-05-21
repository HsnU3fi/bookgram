<template>
  <div>
    <v-container class="fill-height"
                 fluid>
      <v-row justify="center" align="center">
        <v-card-title style="color: white;margin-top: 20px">
          <span class="text-h5">Add Author</span>
        </v-card-title>
      </v-row>
      <v-row justify="start" align="start" style="padding: 20px">

        <v-col md="6" cols="12">
          <v-card color="#2C2F37" style="border-radius: 6px" height="600" class="scroll">
            <v-form
                v-model="form"
                @submit.prevent="onSubmit"
            >
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
                <img :src="imageUrl"  style="border-radius: 5px" width="150" height="180" alt=""/>

              </v-col>


            </v-col>


            <v-card-actions style="margin-top: 5px">
              <v-spacer></v-spacer>

              <v-btn
                  :disabled="!form"
                  :loading="loading"
                  dark
                  variant="elevated"
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
            </v-form>
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
    image: false,
    full_name: "",
    image_author: undefined,
    authors: [],
    form: false,
    imageUrl:undefined,
    loading: false,
    FieldValid: {
      required: value => !!value || 'Field is required',
    },
    PicValid: [
      value => !value  || value.size < 100000 || 'Picture size should be less than 100 KB!',
    ],

  }),
//======================================================================================================================
  methods: {

    saveBookInLocalStorage() {
      this.loading=true
      this.getBase64(this.image_author).then(
          profile_picture =>
              this.authors.push({
                "id": Math.random().toString(16).slice(2),
                "full_name": this.full_name,
                "profile_picture": profile_picture
              }),
      )
      setTimeout(() => {
        localStorage.setItem("authors", JSON.stringify(this.authors))
        window.location.href = "/"
      }, 1000)

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
    onSubmit() {
      if (!this.form) return
      this.loading = true
      setTimeout(() => (this.loading = false), 2000)
    },
//======================================================================================================================
    getItemLocalStorage() {
      let getItem = JSON.parse(localStorage.getItem('authors'))
      if (getItem.length > 0) {
        for (let i in getItem) {
          this.authors.push(getItem[i])
          console.log("test test")
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
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, {passive: true});
  },
  created() {
    this.getItemLocalStorage()
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
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
                      v-model="Name"
                      outlined
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
                      v-model="Name"
                      outlined
                      label="Name"
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
                      v-model="Name"
                      outlined
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
                      v-model="Name"
                      outlined
                      label="Name"
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
                      v-model="Name"
                      outlined
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
                      v-model="Name"
                      outlined
                      label="Name"
                      dense
                      color="#55BE4C"

                  >

                  </v-text-field>

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
    iconAlert: '',
    textAlert: '',
    colorAlert: '',
    snackbar: false,
    dialog: false,
    sel: false,
    selected: undefined,
    cardInfoProjects: true,
    alert: false,
    loading: true,
    packageId: '',
    title: "",
    slack: [""],
    telegram: [""],
    email: [""],
    is_active: true,
    textActive: 'enabled',
    result: [],
    package_list: [],
  }),
//======================================================================================================================
  methods: {
    createProjects() {
      this.snackbar = false
      this.axios.post(`/projects`, {
        title: this.title,
        is_active: this.is_active,
        notifications: {
          telegram: this.telegram,
          slack: this.slack,
          email: this.email
        }
      }).then((res) => {
        if (res.status === 200) {
          this.snackbar = true
          this.iconAlert = 'mdi-checkbox-marked-circle-outline'
          this.textAlert = 'SUCCESS'
          this.colorAlert = 'green'
          setTimeout(() => {
            this.$router.push("/overview");
          }, 1500);
        }
      }).catch(() => {
        this.snackbar = true
        this.iconAlert = 'mdi-alert-outline'
        this.textAlert = 'ERROR MASSAGE'
        this.colorAlert = 'red'
      })
    },
//======================================================================================================================
    onResize() {
      this.image = window.innerWidth < 960;
      this.image = this.image !== true;
    },
//======================================================================================================================
    switchName() {
      if (this.is_active === false) {
        this.textActive = 'Disabled'
      } else {
        this.textActive = 'Enabled'
      }
    },
//======================================================================================================================
    addEmail() {
      this.email.push([]);
    },
    removeEmail(index) {
      this.email.splice(index, 1);
    },
//======================================================================================================================
    addTele() {
      this.telegram.push([]);
    },
    removeTele(index) {
      this.telegram.splice(index, 1);
    },
//======================================================================================================================
    addSlack() {
      this.slack.push([]);
    },
    removeSlack(index) {
      this.slack.splice(index, 1);
    },
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
  background: #F2C83A;
  border-radius: 10px;
}
</style>
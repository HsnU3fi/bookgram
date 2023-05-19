<template>
  <div>

    <v-app-bar
        absolute
        elevation="18"
        height="65"
        app
        clipped-left
        clipped-right
        color="#2C2F37"
    >

        <v-icon
            size="30"
            color="#55BE4C"
            @click.stop="drawer = !drawer"
            v-if="isXs"
        >
          mdi-menu
        </v-icon>

      <img style="margin-top: 10px;margin-left: -35px" width="210" v-if="Image" src="../../assets/img/logo0.png" alt=""/>

      <v-spacer/>
    </v-app-bar>
    <sidebar  :mini="mini" v-if="this.is"/>
    <sidebar-mobile :drawer="drawer" v-if="isXs"/>
  </div>
</template>

<script>
import Sidebar from "@/components/sideBar/SideBar";
import SidebarMobile from "@/components/sideBar/SideBarMob";
export default {
  components: {
    Sidebar,
    SidebarMobile,
  },

  data() {
    return {
      mini: false,
      drawer: false,
      isXs: false,
      is: true,
      Image: true
    }
  },

  methods: {
    onResize() {
      this.isXs = window.innerWidth < 850;
      if (this.isXs === true) {
        this.is = false
        this.Image = false
      } else {
        this.is = true
        this.Image = true
      }
    }
  },
  watch: {
    isXs(value) {
      if (!value) {
        if (this.mini) {
          this.mini = false;
        }
      }
    },
    drawer: function () {
      if (this.drawer === false) {
        this.drawer = true
      }
    },
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, {passive: true});
  },

}
</script>

<style lang="scss">

.theme {
  background: rgb(89, 162, 133);
  background: linear-gradient(50deg, rgba(89, 162, 133, 1) 50%, rgba(14, 14, 14, 1) 100%);
}
</style>

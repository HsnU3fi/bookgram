<template>
  <div>

    <v-navigation-drawer
      style="margin-top: 3px; border-radius: 3px"
      class="elevation-24"
      color="#2C2F37"
      mini-variant-width="70"
      clipped
      absolute
      height="100%"
      v-model="drawer"
      width="170"
      permanent
      :mini-variant.sync="mini"
      :right="$vuetify.rtl"
      app
    >

      <v-btn
        fixed
        right
        elevation="10"
        top
        height="28"
        width="28"
        color="#494B50"
        fab
        @click="mini = !mini"
        :style="{ top: '30px', transform: 'translate(95%, -50%)' }"
      >
        <v-icon size="25" color="#FFF">{{
          mini ? "mdi-chevron-right" : "mdi-chevron-left"
        }}</v-icon>
      </v-btn>

      <v-list-item>
        <div style="height: 30px" />
      </v-list-item>
      <v-list-item-group active-class="bgsidebar" v-model="selectItem" dark>
        <v-list nav dense>

          <v-list-item
              class="SelectedTile"
              link
              to="/"
              style="height: 30px"
          >
            <v-list-item-icon style="margin-top: 8px">
              <v-icon size="20"> mdi-account </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <span style="font-weight: bold; font-size: 13px">Authors</span>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
              class="SelectedTile"
              link
              to="/book"
              style="height: 30px"
          >
            <v-list-item-icon style="margin-top: 8px">
              <v-icon size="20"> mdi-book-open-page-variant </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <span style="font-weight: bold; font-size: 13px">Books</span>
            </v-list-item-content>
          </v-list-item>

        </v-list>
      </v-list-item-group>
    </v-navigation-drawer>
  </div>
</template>

<script>
//======================================================================================================================
export default {
  props: {
    mini: { type: Boolean, default: false },
  },
  data() {
    return {
      selectItem: null,
      drawer: true,
      flagList: true,
    };
  },
  //======================================================================================================================
  mounted() {
    const pathname = window.location.pathname;
    if (pathname === "/" || pathname === "/add-authors" || pathname === "/edit-authors") {
      this.selectItem = 0;
    } else if (pathname === "/book" || pathname === "/add-book" || pathname === "/edit-book") {
      this.selectItem = 1;
    }
  },
};
</script>
<style lang="scss">
.SelectedTile:hover {
  border-radius: 4px;
  background-color: #55BE4C;
}

.bgsidebar {
  background-color: #55BE4C;
}
.v-navigation-drawer--mini-variant,
.v-navigation-drawer {
  overflow: visible !important;
}
</style>

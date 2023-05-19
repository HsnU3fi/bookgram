<template>
  <div>
    <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        app
        dark
        color="#2C2F37"
        width="85%"
    >
      <v-row style="margin: 15px;" justify="end" align="end">
        <v-btn icon right @click="drawer=false">
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </v-row>

      <v-list-item-group
          active-class="bgsidebar"
          v-model="selectItem"
          dark
      >


        <v-list nav dense>
          <v-list-item
              class="SelectedTile"
              link
              to="/books"
              style="height: 30px"
          >
            <v-list-item-icon style="margin-top: 8px">
              <v-icon size="20"> mdi-book-open-page-variant </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <span style="font-weight: bold; font-size: 13px">Books</span>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
              class="SelectedTile"
              link
              to="/authors"
              style="height: 30px"
          >
            <v-list-item-icon style="margin-top: 8px">
              <v-icon size="20"> mdi-account </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <span style="font-weight: bold; font-size: 13px">Authors</span>
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
    drawer: {type: Boolean}
  },
  data() {
    return {
      selectItem: null,
      flagList: true
    }
  },

//======================================================================================================================
  mounted() {
    const pathname = window.location.pathname;
    if (pathname === '/datacenters') {
      this.selectItem = 1
    } else if (pathname === "/overview" || pathname === "/newProject") {
      this.selectItem = 0
    } else if (pathname === "/setting"||pathname === "/updateProject") {
      this.selectItem = 6
    } else if (pathname === "/endpointchart" || pathname === "/ping"|| pathname === "/Traceroute"|| pathname === "/netcat") {
      this.selectItem = 2
    }else if (pathname === "/registerRulesTraceRoute" || pathname === "/registerRulesPing"|| pathname === "/registerRulesNetCat"|| pathname === "/registerRulesEndpoint" || pathname === "/registerRules") {
      this.selectItem = 3
    }else if (pathname === "/Membership") {
      this.selectItem = 5
    }else if (pathname === "/") {
      this.selectItem = 2
    }else if (pathname === "/Logs") {
      this.selectItem = 4
    }
  },


}
</script>
<style lang="scss">
.SelectedTile:hover {
  border-radius: 4px;
  background-color: #55BE4C;
}

.bgsidebar {
  background-color: #55BE4C;
}

.v-navigation-drawer--mini-variant, .v-navigation-drawer {
  overflow: visible !important;
}

</style>

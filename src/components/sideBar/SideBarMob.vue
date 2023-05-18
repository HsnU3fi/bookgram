<template>
  <div>
    <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        app
        dark
        color="#2C2F37"
        width="80%"
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
              href="/overview"
              style="height: 30px"
          >

            <v-list-item-icon style="margin-top: 8px">
              <v-icon size="20">
                mdi-folder
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <span style="font-weight: bold; font-size: 15px;">{{ this.$nameProjecti }}</span>
            </v-list-item-content>

          </v-list-item>
          <div v-if="this.$falgProject">

            <v-list-item
                link
                class="SelectedTile"
                href="/datacenters"
                style="height: 30px;margin-top: 8px"
            >

              <v-list-item-icon style="margin-top: 8px">
                <v-icon size="20">
                  mdi-database
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <span style="font-weight: bold; font-size: 15px;">data centers</span>
              </v-list-item-content>

            </v-list-item>


            <v-list-item
                link
                class="SelectedTile"
                href="/"
                style="height: 30px"
            >

              <v-list-item-icon style="margin-top: 8px">
                <v-icon size="20">
                  mdi-view-dashboard
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <span style="font-weight: bold; font-size: 15px;">{{ $t('sideBar.dashboard') }}</span>
              </v-list-item-content>

            </v-list-item>

            <v-list-item
                link
                class="SelectedTile"
                href="/registerRules"
                style="height: 30px;margin-top: 8px"
            >

              <v-list-item-icon style="margin-top: 8px">
                <v-icon size="20">
                  mdi-checkbox-multiple-marked
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <span style="font-weight: bold; font-size: 15px;">{{ $t('sideBar.register') }}</span>
              </v-list-item-content>

            </v-list-item>
            <v-list-item
                link
                class="SelectedTile"
                href="/Logs"
                style="height: 30px"
            >
              <v-list-item-icon style="margin-top: 8px">
                <v-icon size="20">
                  mdi-view-dashboard
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <span style="font-weight: bold; font-size: 15px;">Logs</span>
              </v-list-item-content>

            </v-list-item>



            <v-list-item
                link
                class="SelectedTile"
                href="/Membership"
                style="height: 20px;margin-top: 8px"
            >

              <v-list-item-icon style="margin-top: 8px">
                <v-icon size="20">
                  mdi-package-variant-closed
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <span style="font-weight: bold; font-size: 15px;">Membership</span>
              </v-list-item-content>

            </v-list-item>





            <v-list-item
                link
                class="SelectedTile"
                href="/updateProject"
                style="height: 30px;"
            >

              <v-list-item-icon style="margin-top: 8px">
                <v-icon size="20">
                  mdi-cog-outline
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <span style="font-weight: bold; font-size: 15px;">{{ $t('sideBar.setting') }}</span>
              </v-list-item-content>
            </v-list-item>
            <div style="background-color: #FFF">
              <v-divider style="margin-top: 30px"/>
            </div>
          </div>
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
  background-color: #e6b71c;
}

.bgsidebar {
  background-color: #e6b71c;
}

.v-navigation-drawer--mini-variant, .v-navigation-drawer {
  overflow: visible !important;
}

</style>

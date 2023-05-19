<template>
  <v-app style="background-color: #1e2027">
    <app-bar />
    <v-main>
      <router-view />
    </v-main>
    <Footer />
<!--    <loading :value="true"/>-->

  </v-app>
</template>
<script>
import AppBar from "@/components/appBar/AppBar";
import Footer from "@/components/footer/Footer";
// import Loading from "@/components/loading/Loding";


export default {
  name: "App",
  components: { AppBar, Footer,
    // Loading
  },

};

</script>
<style>
@font-face {
  font-family: IranSans;
  src: url('/assets/fonts/iransans/IRANSansWeb_Light.eot');
  src: url('/assets/fonts/iransans/IRANSansWeb_Light.eot?#iefix') format('embedded-opentype'),
  url('assets/fonts/iransans/IRANSansWeb_Light.woff2') format('woff2'),
  url('assets/fonts/iransans/IRANSansWeb_Light.woff') format('woff'),
  url('assets/fonts/iransans/IRANSansWeb_Light.ttf') format('truetype');
  font-weight: normal;
}

* {
  font-family: 'IranSans', sans-serif;
  font-size: 15px;
  overflow: hidden;
}

</style>

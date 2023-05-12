<template>
  <Header></Header>
  <router-view></router-view>
  <!-- HACK Footer底部组件显示 -->
  <!-- <Footer></Footer> -->
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<style lang="scss" scoped>
</style>

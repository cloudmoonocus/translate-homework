<template>
  <Header v-show="!$route.meta.isHideHeader"></Header>
  <router-view :key="$route.fullPath"></router-view>
  <Footer v-if="$route.path === '/home'"></Footer>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<style lang="scss" scoped>
</style>

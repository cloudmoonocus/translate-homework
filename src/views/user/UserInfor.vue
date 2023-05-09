<template>
    <div class="uMain">
        <InforUser></InforUser>
        <TaskUser></TaskUser>
    </div>
</template>

<script setup>
import InforUser from '../../components/user/InforUser.vue'
import TaskUser from '../../components/user/TaskUser.vue'
</script>

<style lang="scss" scoped>
.uMain {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100vw - 250px);
}
</style>

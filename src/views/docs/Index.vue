<template>
    <div class="main">
        <el-menu :default-active="activeIndex" class="menu" :router="true">
            <el-menu-item index="/docs/create">
                <el-icon>
                    <DocumentAdd />
                </el-icon>
                <span>{{ $t('Create documents') }}</span>
            </el-menu-item>
            <el-menu-item index="/docs/list">
                <el-icon>
                    <Collection />
                </el-icon>
                <span>{{ $t('Document list') }}</span>
            </el-menu-item>
        </el-menu>
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { useUserStore } from '../../stores/user'

const router = useRouter()
const userData = useUserStore()

// 默认菜单
const activeIndex = ref(router.currentRoute.value.path)

// 解决当使用浏览器回退功能时菜单不跟随聚焦的问题
watch(
    () => router.currentRoute.value.path,
    () => activeIndex.value = router.currentRoute.value.path
)
</script>

<style lang="scss" scoped>
.main {
    display: flex;
    min-height: calc(100vh - 70px);
    background-color: #eef1f9;
}

.menu {
    width: 250px;
    padding-top: 2vh;
}
</style>

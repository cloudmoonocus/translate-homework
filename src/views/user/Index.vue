<template>
    <div class="main">
        <el-menu :default-active="activeIndex" class="menu" :router="true">
            <el-menu-item index="/user/infor">
                <el-icon>
                    <User />
                </el-icon>
                <span>{{ $t('Personal information') }}</span>
            </el-menu-item>
            <el-menu-item index="/user/manage" v-if="userData.userInfor.role === 'root'">
                <el-icon>
                    <Tools />
                </el-icon>
                <span>{{ $t('user management') }}</span>
            </el-menu-item>
        </el-menu>
        <router-view></router-view>
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
}

.menu {
    width: 250px;
    padding-top: 2vh;
}
</style>

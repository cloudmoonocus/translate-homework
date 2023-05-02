<template>
    <div class="main">
        <el-menu :default-active="activeIndex" class="menu" :router="true">
            <el-menu-item index="/tsl/mt">
                <el-icon>
                    <Monitor />
                </el-icon>
                <span>{{ $t('MT') }}</span>
            </el-menu-item>
            <el-menu-item index="/tsl/sc">
                <el-icon>
                    <Checked />
                </el-icon>
                <span>{{ $t('Spell check') }}</span>
            </el-menu-item>
            <el-menu-item index="/tsl/ta">
                <el-icon>
                    <MagicStick />
                </el-icon>
                <span>{{ $t('TL hints') }}</span>
            </el-menu-item>
        </el-menu>
        <router-view></router-view>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'

const { locale } = useI18n()
const router = useRouter()

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
    height: calc(100vh - 70px);
    padding-top: 2vh;
    padding-left: 2vw;
}
</style>

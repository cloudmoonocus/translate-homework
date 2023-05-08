<template>
    <el-menu :default-active="activeIndex" class="menu" mode="horizontal" :ellipsis="false" :router="true" v-if="showKey">
        <!-- logo -->
        <el-menu-item index="/home">G11N TranSpace</el-menu-item>
        <!-- 占位 -->
        <div class="flex-grow" />
        <!-- 首页 -->
        <el-menu-item index="/home">{{ $t("Index") }}</el-menu-item>
        <!-- 自助翻译 -->
        <el-sub-menu index="/tsl">
            <template #title>
                <el-icon>
                    <Promotion />
                </el-icon>
                <span>{{ $t("Self-translation") }}</span>
            </template>
            <el-menu-item index="/tsl/mt">{{ $t('MT') }}</el-menu-item>
            <el-menu-item index="/tsl/sc">{{ $t('Spell check') }}</el-menu-item>
            <el-menu-item index="/tsl/ta">{{ $t('TL hints') }}</el-menu-item>
        </el-sub-menu>
        <!-- 登录 -->
        <el-menu-item index="/signin" v-if="!userData.token">{{ $t('Login') }}</el-menu-item>
        <!-- 注册 -->
        <el-menu-item index="/signup" v-if="!userData.token">{{ $t('Register') }}</el-menu-item>
        <!-- 任务管理 -->
        <el-sub-menu index="/tasks" v-if="!!userData.token">
            <template #title>
                <el-icon>
                    <Grid />
                </el-icon>
                <span>{{ $t('Task management') }}</span>
            </template>
            <el-menu-item index="/tasks/handle">
                {{ $t('Manage and create tasks') }}
            </el-menu-item>
            <el-menu-item index="/tasks/mytask">
                {{ $t('My tasks') }}
            </el-menu-item>
        </el-sub-menu>
        <!-- 文档翻译 -->
        <el-sub-menu index="/docs" v-if="!!userData.token">
            <template #title>
                <el-icon>
                    <Document />
                </el-icon>
                <span>{{ $t('Doc-translation') }}</span>
            </template>
            <el-menu-item index="/docs/create">
                {{ $t('Create documents') }}
            </el-menu-item>
            <el-menu-item index="/docs/list">
                {{ $t('Document list') }}
            </el-menu-item>
        </el-sub-menu>
        <!-- 用户 -->
        <el-sub-menu index="/user" v-if="!!userData.token">
            <template #title>
                <el-icon>
                    <UserFilled />
                </el-icon>
                <span>{{ userData.userName }}</span>
            </template>
            <el-menu-item index="/user/infor">
                {{ $t('Personal information') }}
            </el-menu-item>
            <el-menu-item index="/user/manage" v-if="userData.userInfor.role === 'root'">
                {{ $t('user management') }}
            </el-menu-item>
            <el-menu-item index="" style="color: rgb(235, 73, 73);" @click="logOut">
                {{ $t('Log out') }}
            </el-menu-item>
        </el-sub-menu>
        <!-- 占位 -->
        <div class="flex-grow2" />
        <!-- 语言 -->
        <el-sub-menu index="null">
            <template #title>
                <img class="menu_image" src="../assets/icons/globe.gif" alt="language">
                <span>{{ $t('Language') }}</span>
            </template>
            <el-menu-item @click="changeLang('zh')">
                <el-icon v-if="locale === 'zh'">
                    <CaretRight />
                </el-icon>
                简体中文
            </el-menu-item>
            <el-menu-item @click="changeLang('en')">
                <el-icon v-if="locale === 'en'">
                    <CaretRight />
                </el-icon>
                English
            </el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '../stores/user'
import { loginout } from '../api/user'
import { inforReset } from '../utils/inforReset'

const userData = useUserStore()
const { locale } = useI18n()
const router = useRouter()
const showKey = ref(true)

// 默认菜单
const activeIndex = ref(router.currentRoute.value.path)

// 解决当使用浏览器回退功能时菜单不跟随聚焦的问题
watch(
    () => router.currentRoute.value.path,
    () => {
        activeIndex.value = router.currentRoute.value.path
        showKey.value = false
        nextTick(() => {
            showKey.value = true
        })
    }
)

// 切换语言
function changeLang(lang) {
    locale.value = lang
    localStorage.setItem('lang', lang)
}

// 退出
function logOut() {
    loginout({
        'id': localStorage.getItem('id')
    }).then((val) => {
        if (val.code === 200) {
            inforReset()
        }
    })
}
</script>

<style lang="scss" scoped>
.flex-grow {
    flex-grow: 5;
}

.flex-grow2 {
    flex-grow: 0.7;
}

.menu {
    padding-left: 30px;
    padding-right: 30px;
    height: 70px;

    &_image {
        width: 20px;
        height: 20px;
        margin-right: 5px;
    }
}
</style>

<template>
    <div class="hm_main">
        <div class="hm_main_select">
            <el-select v-model="sourceLan" placeholder="源语言">
                <el-option label="中文" value="zh" />
            </el-select>
            <el-icon>
                <Switch />
            </el-icon>
            <el-select v-model="targetLan" placeholder="目标语言">
                <el-option label="English" value="en" />
            </el-select>
        </div>
        <div class="hm_main_btn">
            <el-button type="primary" round>{{ $t('Translate') }}</el-button>
            <el-button round>{{ $t('Reset text') }}</el-button>
            <el-button round>{{ $t('Reset language') }}</el-button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const sourceLan = ref('English')
const targetLan = ref('简体中文')
</script>

<style lang="scss" scoped>
.hm_main {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    min-width: 950px;
    width: 950px;
    height: 50px;

    margin-top: 5vh;

    &_select {
        display: flex;
        justify-content: space-evenly;
        min-width: 50%;
        width: 50%;
        align-items: center;
    }

    &_btn {
        display: flex;
        justify-content: space-evenly;
        min-width: 30%;
        width: 30%;
        align-items: center;
    }
}
</style>

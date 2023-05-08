<template>
    <div class="hm_main">
        <div class="hm_main_select" v-if="props.mode === 'MT' || props.mode === 'TA'">
            <el-select v-model="sourceLan" placeholder="源语言">
                <el-option :label="val.label" :value="val.value" v-for="val in props.sourceLanList" />
            </el-select>
            <el-icon>
                <Switch />
            </el-icon>
            <el-select v-model="targetLan" placeholder="目标语言">
                <el-option :label="val.label" :value="val.value" v-for="val in props.targetLanList" />
            </el-select>
        </div>
        <div class="hm_main_select" v-else-if="props.mode === 'SC'">
            <div>请选择校对的语言：</div>
            <el-select v-model="sourceLan" placeholder="源语言">
                <el-option :label="val.label" :value="val.value" v-for="val in props.sourceLanList" />
            </el-select>
            <div style="flex: 0.5;"></div>
        </div>
        <div class="hm_main_btn">
            <el-button type="primary" round @click="$emit('handle', sourceLan, targetLan)">
                {{ $t(`${props.text}`) }}
            </el-button>
            <el-button round @click="$emit('resetText')">{{ $t('Reset text') }}</el-button>
            <el-button round @click="resetLan">{{ $t('Reset language') }}</el-button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps(['sourceLanList', 'targetLanList', 'mode', 'text'])

const sourceLan = ref('en')
const targetLan = ref('zh')

function resetLan() {
    sourceLan.value = 'en'
    targetLan.value = 'zh'
}
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

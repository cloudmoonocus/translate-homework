<template>
    <div class="sc_main">
        <HeaderMenu class="tool"></HeaderMenu>
        <div class="sc_main_textarea">
            <el-input class="sc_main_textarea_item" v-model="sourceDoc" :rows="15" type="textarea"
                :placeholder="$t('Please enter the text to be translated here')" />
            <div class="sc_main_textarea_item sc_main_textarea_res"></div>
        </div>
    </div>
</template>

<script setup>
import HeaderMenu from '../../components/translate/HeaderMenu.vue'

import { ref } from 'vue'

const sourceDoc = ref(null)
const targetDoc = ref(null)
</script>

<style lang="scss" scoped>
.sc_main {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;

    &_textarea {
        margin-top: 5vh;
        display: flex;
        justify-content: space-evenly;
        width: 80%;

        &_item {
            width: 500px;
        }

        &_res {
            width: 500px;
            border: 1px solid #ccc;
            border-radius: 4px;
            background-color: #fff;
            padding: 10px;
        }
    }
}
</style>

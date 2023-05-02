<template>
    <div class="mt_main">
        <HeaderMenu class="tool"></HeaderMenu>
        <div class="mt_main_textarea">
            <el-input class="mt_main_textarea_item" v-model="sourceDoc" :rows="15" type="textarea"
                :placeholder="$t('Please enter the text to be translated here')" />
            <el-input class="mt_main_textarea_item" v-model="targetDoc" :rows="15" type="textarea"
                :placeholder="$t('The target language text will be displayed here')" />
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
.mt_main {
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
    }
}
</style>

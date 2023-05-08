<template>
    <div class="mt_main">
        <HeaderMenu class="tool" :sourceLanList="sourceLanList" :targetLanList="targetLanList" @handle="handle"
            @resetText="resetText" mode="MT" text="Translate">
        </HeaderMenu>
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
import { mt } from '../../api/qualityassurance';
import message from '../../utils/message';

// 源语言列表
const sourceLanList = ref([{
    label: '简体中文',
    value: 'zh'
}, {
    label: 'English',
    value: 'en'
}])
// 目标语言列表
const targetLanList = ref([{
    label: 'English',
    value: 'en'
}, {
    label: '简体中文',
    value: 'zh'
}])

const sourceDoc = ref('')
const targetDoc = ref('')

// 翻译
function handle(from, to) {
    if (sourceDoc.value === '') {
        message.warning('请输入需要翻译的内容')
        return
    }
    mt(sourceDoc.value, from, to).then((value) => {
        if (value.code !== 200) {
            message.error(value.msg)
        } else {
            targetDoc.value = value.data.translatedText
            message.success('翻译完成')
        }
    })
}

// 重置文档
function resetText() {
    sourceDoc.value = ''
    targetDoc.value = ''
}
</script>

<style lang="scss" scoped>
.mt_main {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: calc(100vw - 250px);

    &_textarea {
        margin-top: 5vh;
        display: flex;
        justify-content: space-evenly;
        width: 90%;

        &_item {
            width: 500px;
        }
    }
}
</style>

<template>
    <div class="ta_main">
        <HeaderMenu class="tool" mode="TA" text="Confirm" :sourceLanList="sourceLanList" :targetLanList="targetLanList"
            @handle="handle" @resetText="resetText"></HeaderMenu>
        <div class="ta_main_textarea">
            <el-input class="ta_main_textarea_item" v-model="sourceDoc" :rows="15" type="textarea"
                :placeholder="$t('Please enter the text to be translated here')" />
            <div class="ta_main_textarea_item ta_main_textarea_res">
                <el-card style="margin-bottom: 10px;" shadow="hover" v-for="val in resDoc" v-if="resDoc.length">
                    <template #header>
                        <span>{{ val.sourceText }}</span>
                    </template>
                    <span>{{ val.targetText }}</span>
                </el-card>
                <h3 v-else style="text-align: center;line-height: 30vh;">无任何翻译建议</h3>
            </div>
        </div>
    </div>
</template>

<script setup>
import HeaderMenu from '../../components/translate/HeaderMenu.vue'
import { tmSearch } from '../../api/qualityassurance'
import { ref } from 'vue'
import message from '../../utils/message'

const sourceDoc = ref('')
const resDoc = ref([])

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

// 建议
function handle(from, to) {
    if (sourceDoc.value === '') {
        message.warning('请输入需要翻译的文本')
        return
    }

    tmSearch(sourceDoc.value, from, to).then((value) => {
        if (value.code !== 200) {
            message.error(value.msg)
        } else {
            message.success('翻译完成')
            resDoc.value = value.data
        }
    })
}

// 重置文档
function resetText() {
    sourceDoc.value = ''
    resDoc.value = []
}
</script>

<style lang="scss" scoped>
.ta_main {
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

            :deep(.el-textarea__inner) {
                height: 53vh;
            }
        }

        &_res {
            overflow: auto;
            width: 500px;
            height: 50vh;
            border: 1px solid #ccc;
            border-radius: 4px;
            background-color: #fff;
            padding: 10px;
        }
    }
}
</style>

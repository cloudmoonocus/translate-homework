<template>
    <div class="sc_main">
        <HeaderMenu class="tool" mode="SC" text="Checking" :sourceLanList="languageList" @handle="handle"
            @resetText="resetText"></HeaderMenu>
        <div class="sc_main_textarea">
            <el-input class="sc_main_textarea_item" v-model="sourceDoc" type="textarea"
                :placeholder="$t('Please enter the text to be checked here')" />
            <div class="sc_main_textarea_item sc_main_textarea_res">
                <el-card style="margin-bottom: 10px;" shadow="hover" v-for="val in resDoc" v-if="resDoc.length">
                    <template #header>
                        <span>{{ val.name }}</span>
                    </template>
                    <el-tag v-if="val.suggestion === 'No suggestions'">{{ val.suggestion }}</el-tag>
                    <el-tag v-else style="margin-right: 10px; margin-bottom: 10px;" v-for="sug in val.suggestion">{{ sug
                    }}</el-tag>
                </el-card>
                <h3 v-else style="text-align: center;margin-top: 15vh;">无任何语法错误</h3>
            </div>
        </div>
    </div>
</template>

<script setup>
import HeaderMenu from '../../components/translate/HeaderMenu.vue'
import { languageList } from '../../assets/infor/languageList'
import { ref } from 'vue'
import { hunspell } from '../../api/qualityassurance'
import message from '../../utils/message'

const sourceDoc = ref('')
const resDoc = ref([])

// 检查
function handle(language) {
    if (sourceDoc.value === '') {
        message.warning('请输入需要检查的文本')
        return
    }
    hunspell(sourceDoc.value, language).then((value) => {
        if (value.code !== 200) {
            message.error(value.msg)
        } else {
            resDoc.value = value.data.result.filter((val) => {
                return val.spellCheck !== 'ok'
            })
            if (resDoc.value.length === 0) {
                message.success('检查完成，没有错误')
            } else message.success('检查完成')
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
.sc_main {
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

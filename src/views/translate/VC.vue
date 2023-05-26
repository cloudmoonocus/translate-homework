<template>
    <div class="ta_main">
        <div class="ta_main_textarea">
            <el-input class="ta_main_textarea_item" v-model="sourceDoc" :rows="15"
                :placeholder="$t('Please enter the text to be checked here')" clearable @keyup.enter="handle">
                <template #append>
                    <el-button :icon="SuccessFilled" @click="handle" />
                </template>
            </el-input>
            <div class="ta_main_textarea_res">
                <el-card style="margin-bottom: 10px;" shadow="hover" v-for="val in resDoc" v-if="resDoc.length">
                    <template #header>
                        <span>{{ val.error }}</span>
                    </template>
                    <div style="display: flex; align-items: center; flex-wrap:wrap;">
                        <el-tag style="margin-right: 5px;" v-for="replace in val.replacements">{{ replace }}</el-tag>
                        <span v-if="!val.replacements.length" style="color: #ccc;">{{ $t('No Suggetions') }}</span>
                    </div>
                    <div style="margin-top: 15px;">{{ val.suggestion }}</div>
                </el-card>
                <h3 v-else style="text-align: center;margin-top: 15vh;">{{ $t('No suggestions') }}</h3>
            </div>
        </div>
    </div>
</template>

<script setup>
import { check } from '../../api/translate'
import { ref } from 'vue'
import message from '../../utils/message'
import { SuccessFilled } from '@element-plus/icons-vue'

const sourceDoc = ref('')
const resDoc = ref([])

// 建议
function handle() {
    if (sourceDoc.value === '') {
        message.warning('请输入需要检查的文本')
        return
    }

    check(sourceDoc.value).then((value) => {
        if (value.code !== 200) {
            message.error(value.msg)
        } else {
            message.success('检查完成')
            resDoc.value = value.data
        }
    })
}
</script>

<style lang="scss" scoped>
.ta_main {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: calc(100vw - 250px);

    &_textarea {
        margin-top: 8vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        width: 100%;

        &_item {
            width: 78%;
            height: 60px;

            :deep(.el-textarea__inner) {
                height: 10vh;
            }

            :deep(.el-input-group__append) {
                width: 30px;
            }
        }

        &_res {
            overflow: auto;
            margin-top: 15px;
            width: 75%;
            min-height: 60vh;
            border: 1px solid #ccc;
            border-radius: 4px;
            background-color: #fff;
            padding: 10px;
            margin-bottom: 15px;
        }
    }
}
</style>

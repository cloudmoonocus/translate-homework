<template>
    <el-container class="main">
        <el-header class="main_head" height="100px">
            <div class="main_head_left">
                <el-icon class="menuBack" @click="$router.back()">
                    <Back />
                </el-icon>
                <div class="menuIcon" @click="saveDoc">
                    <img style="height: 40px;width: 40px;" src="../../assets/images/menufonts/save.svg" alt="save">
                    <div style="font-size: 14px;">{{ $t('Save Submit') }}</div>
                </div>
                <div class="menuIcon" @click="translateAll">
                    <img style="height: 40px;width: 40px;" src="../../assets/images/menufonts/translate.svg"
                        alt="translate">
                    <div style="font-size: 14px;">{{ $t('MT') }}</div>
                </div>
                <div class="menuIcon">
                    <img style="height: 40px;width: 40px;" src="../../assets/images/menufonts/check.svg" alt="check">
                    <div style="font-size: 14px;">{{ $t('Proofread') }}</div>
                </div>
                <div class="menuIcon" @click="submit" v-if="userData.currentTaskID">
                    <img style="height: 40px;width: 40px;" src="../../assets/images/menufonts/submit.svg" alt="submit">
                    <div style="font-size: 14px;">{{ $t('Submit') }}</div>
                </div>
            </div>
            <el-input class="menuSearch" v-model="search" :prefix-icon="Search" :placeholder="$t('Doc Search')" clearable
                size="large">
                <template #append>
                    <el-button type="primary" :icon="Search" />
                </template>
            </el-input>
        </el-header>
        <el-container class="main_ctx">
            <el-aside width="400px" class="main_ctx_aside">
                <div class="main_ctx_aside_mt">
                    <el-input v-model="mtData" :placeholder="$t('Please enter the text to be translated here')" size="large"
                        clearable>
                        <template #append>
                            <el-button :icon="Search" @click="asideMT" />
                        </template>
                    </el-input>
                    <el-input style="margin-top: 10px;" v-model="mtResultData" type="textarea"
                        :autosize="{ minRows: 5, maxRows: 15 }" />
                </div>
                <el-divider />
                <div class="main_ctx_aside_sc">
                    <el-input v-model="scData" :placeholder="$t('Please enter the text to be checked here')" size="large"
                        clearable>
                        <template #append>
                            <el-button :icon="Search" @click="asideSC" />
                        </template>
                    </el-input>
                    <el-card style="margin-top: 5px; margin-bottom: 15px;" shadow="hover" v-for="val in scResultData">
                        <template #header>
                            <span style="color: #ff0000;">{{ val.error }}</span>
                        </template>
                        <div style="display: flex;align-items: center;flex-wrap: wrap;gap: 10px;">
                            <el-tag v-for="replace in val.replacements">{{ replace }}</el-tag>
                        </div>
                        <div style="margin-top: 15px;">
                            {{ val.suggestion }}
                        </div>
                    </el-card>
                </div>
            </el-aside>
            <el-main class="main_ctx_content">
                <el-card class="card" shadow="hover" v-for="(ct, index) in docData.contentList">
                    <template #header>
                        <div class="card_header">
                            <span class="card_header_text">{{ ct.sourceText }}</span>
                            <el-button class="card_header_btn" type="primary" @click="onMT(ct.sourceText, index)">{{
                                $t('MT')
                            }}</el-button>
                        </div>
                    </template>
                    <el-input autosize v-model="ct.targetText" type="textarea"
                        :placeholder="$t('Enter translated text here')"></el-input>
                </el-card>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
import { getDocument, updateAllContent } from '../../api/document'
import { mt } from '../../api/qualityassurance'
import message from '../../utils/message'
import deepCopy from 'deepcopy'
import { submitTask } from '../../api/task'
import { useUserStore } from '../../stores/user'
import router from '../../router'
import { check } from '../../api/qualityassurance'

const userData = useUserStore()
const route = useRoute()
const { id: docID } = route.params

// 如果是自己输入地址进来/刷新，直接返回用户信息页
// 如果是管理员，可以从文档列表进入，但是无法提交任务
if (userData.currentTaskID === 0 && !userData.userInfor.role === 'root') {
    router.push('/user/infor')
    message.warning('请在最近任务中进入文档')
}

// 搜索关键词
const search = ref('')

// 获取文档信息
const docData = ref([])
getDocument(docID).then((val) => {
    if (val.code === 200) {
        docData.value = val.data
    }
})

// 单句机器翻译
function onMT(text, index) {
    mt(text, docData.value.sourceLang, docData.value.targetLang).then((value) => {
        if (value.code !== 200) {
            message.error(value.msg)
        } else {
            docData.value.contentList[index].targetText = value.data.translatedText
            saveDoc()
            message.success('翻译完成')
        }
    })
}

// 保存
function saveDoc() {
    let contentList = deepCopy(docData.value.contentList)
    let filterData = contentList.map((val) => {
        return {
            documentId: val.documentId,
            sentenceId: val.sentenceId,
            sourceText: val.sourceText,
            targetText: val.targetText,
            description: val.description,
        }
    })
    updateAllContent(docID, filterData).then((value) => {
        if (value.code !== 200) {
            message.error(value.msg)
        } else {
            message.success('保存成功')
        }
    })
}

// 定时保存
let timer = null
onMounted(() => {
    timer = setInterval(() => {
        let contentList = deepCopy(docData.value.contentList)
        let filterData = contentList.map((val) => {
            return {
                documentId: val.documentId,
                sentenceId: val.sentenceId,
                sourceText: val.sourceText,
                targetText: val.targetText,
                description: val.description,
            }
        })
        updateAllContent(docID, filterData).then((value) => {
            if (value.code !== 200) {
                message.error(value.msg)
            }
        })
    }, 30 * 1000)
})
onBeforeUnmount(() => {
    userData.currentTaskID = 0
    clearInterval(timer)
})

// 翻译整个文档
function translateAll() {
    let promiseAsync = []
    docData.value.contentList.forEach((val) => {
        let text = val.sourceText
        if (text === '') text = 'null'
        promiseAsync.push(mt(text, docData.value.sourceLang, docData.value.targetLang))
    })
    Promise.all(promiseAsync).then((value) => {
        docData.value.contentList.forEach((val, index) => {
            console.log();
            if (value[index].code !== 200) {
                val.targetText = '翻译失败'
            } else val.targetText = value[index].data.translatedText
        })
    })
}

// 提交任务
function submit() {
    submitTask(userData.userInfor.id, userData.currentTaskID).then((value) => {
        if (value.code !== 200) {
            message.error(value.msg)
        } else {
            message.success('提交成功')
            router.replace('/user/infor')
        }
    })
}

// 左侧机器翻译
const mtData = ref('')
const mtResultData = ref('')
function asideMT() {
    if (mtData.value === '') {
        message.warning('请输入需要翻译的内容')
        return
    }

    mt(mtData.value, docData.value.sourceLang, docData.value.targetLang).then((value) => {
        if (value.code !== 200) {
            message.error(value.msg)
        } else {
            mtResultData.value = value.data.translatedText
            message.success('翻译完成')
        }
    })
}

// 左侧语法检查
const scData = ref('')
const scResultData = ref('')
function asideSC() {
    if (scData.value === '') {
        message.warning('请输入需要检查的内容')
        return
    }
    check(scData.value).then((value) => {
        if (value.code !== 200) {
            message.error(value.msg)
        } else {
            scResultData.value = value.data
            message.success('检查完成')
        }
    })
}
</script>

<style lang="scss" scoped>
.main {
    height: 100vh;

    &_head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px #d2d2d2 solid;

        &_left {
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }
    }

    &_ctx {
        height: calc(100% - 100px);

        &_aside {
            display: flex;
            flex-direction: column;
            align-items: center;
            border-right: 1px #d2d2d2 solid;
            height: 100%;

            &_mt {
                margin-top: 40px;
                width: 90%;
            }

            &_sc {
                width: 90%;
            }
        }

        &_content {
            height: 100%;
            overflow: auto;
        }
    }
}

.menuBack {
    font-size: 30px;
    border-radius: 50%;
    border: 1px #d3d3d3 solid;
    padding: 10px;
    cursor: pointer;

    &:hover {
        border: 1px solid #79bbff;
    }
}

.menuIcon {
    box-sizing: border-box;
    text-align: center;
    padding: 10px 0;
    width: 75px;
    color: #696969;
    cursor: pointer;

    &:hover {
        border: 1px solid #79bbff;
        border-radius: 10px;
        color: #409EFF;
    }
}

.menuSearch {
    width: 400px;

    :deep(.el-input-group__append) {
        width: 20px;
        color: #fff;
        font-size: 16px;
        background-color: #409eff;
        box-shadow: none;
    }
}

.card {
    margin-bottom: 15px;

    &_header {
        display: flex;
        justify-content: space-between;
        width: 100%;

        &_text {
            text-align: justify;
            display: inline-block;
            width: 87%;
            line-height: 1.5;
            letter-spacing: 1.5;
        }
    }
}
</style>

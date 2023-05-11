<template>
    <div class="cMain">
        <div class="cMain_head">
            <div class="cMain_head_left">
                <el-select v-model="createWay" placeholder="Select">
                    <el-option :label="$t('Create documents from text')" value="text" />
                    <el-option :label="$t('Create documents from URL')" value="url" />
                </el-select>
                <el-select v-model="sourceLan" placeholder="源语言" style="width: 100px;">
                    <el-option :label="val.label" :value="val.value" v-for="val in sourceLanList" :key="val.value" />
                </el-select>
                <el-icon>
                    <Switch />
                </el-icon>
                <el-select v-model="targetLan" placeholder="目标语言" style="width: 100px;">
                    <el-option :label="val.label" :value="val.value" v-for="val in targetLanList" :key="val.value" />
                </el-select>
            </div>
            <div class="cMain_head_right">
                <el-button type="primary" @click="createDoc">{{ $t('Analysis') }}</el-button>
                <el-button type="warning" plain v-if="createWay === 'text'" @click="text = ''">{{ $t('Reset text')
                }}</el-button>
                <el-button type="warning" plain v-else @click="reset">{{ $t('Reset URL') }}</el-button>
                <el-button type="warning" plain @click="() => {
                    sourceLan = 'zh'
                    targetLan = 'en'
                }">{{ $t('Reset language') }}</el-button>
            </div>
        </div>
        <div class="cMain_ctx">
            <label>
                <span>{{ $t('Please enter the document title') }}：</span>
                <el-input v-model="docName" :placeholder="$t('Please enter the document title')" style="width: 30%;">
                </el-input>
            </label>
            <div style="margin-top: 20px;">
                <el-input v-model="text" :autosize="{ minRows: 20, maxRows: 500 }" type="textarea"
                    :placeholder="$t('Please enter the text to be parsed here')" v-if="createWay === 'text'" />
                <div v-else>
                    <el-form :model="urlData" label-width="auto" label-position="top">
                        <el-form-item :label="$t('Gitee UserName')">
                            <el-input v-model="urlData.gitUsername" style="width: 50%;" />
                        </el-form-item>
                        <el-form-item :label="$t('Gitee Password')">
                            <el-input v-model="urlData.gitPassword" type="password" style="width: 50%;" />
                        </el-form-item>
                        <el-form-item :label="$t('Gitee URL')">
                            <el-input v-model="urlData.url" style="width: 50%;" />
                        </el-form-item>
                        <el-form-item :label="$t('Gitee document\'s path')">
                            <el-input v-model="urlData.docUrl" style="width: 50%;" />
                        </el-form-item>
                        <el-form-item :label="$t('Gitee document\'s remoteBranch')">
                            <el-input v-model="urlData.remoteBranch" style="width: 50%;" />
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { createByText, createByUrl } from '../../api/document'
import message from '../../utils/message'

// 创建方式
const createWay = ref('text')

// 待解析的文本
const text = ref('')

// 待解析的url数据
const urlData = ref({
    gitUsername: "",
    gitPassword: "",
    url: "",
    docUrl: "README.md",
    remoteBranch: "master"
})

// 源语言
const sourceLan = ref('zh')
// 目标语言
const targetLan = ref('en')
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

// 文档名称
const docName = ref('')

//创建文档
function createDoc() {
    if (createWay.value === 'text') {
        createDocByText()
        return
    }
    createDocByUrl()
}
function createDocByText() {
    if (text.value === '') {
        message.warning('请输入待解析的文本/URL')
        return
    }
    let name = docName.value
    if (docName.value === '') name = Date.now()
    createByText(name, sourceLan.value, targetLan.value, text.value).then((value) => {
        if (value.code === 200) {
            reset()
            message.success('创建成功' + value.data)
        }
    })
}
function createDocByUrl() {
    let name = docName.value
    if (docName.value === '') name = Date.now()
    for (const key in urlData.value) {
        if (Object.hasOwnProperty.call(urlData.value, key)) {
            if (urlData.value[key] === '') {
                message.warning('信息不完整')
                return
            }
        }
    }
    const data = {
        name: name,
        sourceLang: sourceLan.value,
        targetLang: targetLan.value,
        ...urlData.value
    }
    createByUrl(data).then((value) => {
        if (value.code === 200) {
            reset()
            message.success('创建成功')
        }
    })
}

// 清空信息
function reset() {
    text.value = ''
    docName.value = ''
    urlData.value = {
        gitUsername: "",
        gitPassword: "",
        url: "",
        docUrl: "README.md",
        remoteBranch: "master"
    }
}
</script>

<style lang="scss" scoped>
.cMain {
    box-sizing: content-box;
    width: calc(100vw - 250px);
    padding: 5vh 5vw;

    &_head {
        display: flex;
        gap: 1rem;

        &_left {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        &_right {
            margin-left: 10vw;
            display: flex;
            gap: 15px;
        }
    }

    &_ctx {
        margin-top: 5vh;
        width: 100%;
    }
}
</style>

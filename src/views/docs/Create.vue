<template>
    <div class="cMain">
        <div class="cMain_head">
            <div class="cMain_head_left">
                <el-select v-model="createWay" placeholder="Select">
                    <el-option :label="$t('Import documents from Gitee repository')" value="url" />
                    <el-option :label="$t('Create documents from text')" value="text" />
                </el-select>
                <el-select v-model="sourceLan" placeholder="源语言" style="width: 100px;">
                    <el-option :label="val.label" :value="val.value" v-for="val in sourceLang" :key="val.value" />
                </el-select>
                <el-icon>
                    <Switch />
                </el-icon>
                <el-select v-model="targetLan" placeholder="目标语言" style="width: 100px;">
                    <el-option :label="val.label" :value="val.value" v-for="val in targetLang" :key="val.value" />
                </el-select>
            </div>
            <div class="cMain_head_right">
                <el-button v-if="!userData.userInfor.giteeEmail && createWay === 'url'" type="primary" color="#c71d23"
                    @click="createDocFromGitee">
                    <template #icon>
                        <i class="iconfont icon-gitee"></i>
                    </template>
                    {{ $t('Bind Gitee account') }}
                </el-button>
                <el-button v-else type="primary" @click="createDoc">{{ $t('Analysis') }}</el-button>
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
                    <el-form :model="urlData" label-width="auto" label-position="top"
                        :disabled="!userData.userInfor.giteeEmail">
                        <el-form-item :label="$t('Gitee UserName')">
                            <el-input v-model="urlData.gitUsername" style="width: 50%;" />
                        </el-form-item>
                        <el-form-item :label="$t('Gitee Password')">
                            <el-input v-model="urlData.gitPassword" style="width: 50%;" />
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
import { createByText, createByGitUrl } from '../../api/document'
import message from '../../utils/message'
import router from '../../router'
import { useRoute } from 'vue-router'
import { sourceLang, targetLang } from '../../assets/infor/languageList'
import { useUserStore } from '../../stores/user'

const userData = useUserStore()
const route = useRoute()

// 创建方式
const createWay = ref('url')

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

// 文档名称
const docName = ref('')

//创建文档
function createDoc() {
    if (createWay.value === 'url') {
        return
    }
    createDocByText()
}
// TODO 从Gitee仓库导入
function createDocFromGitee() {
    // 如果没有绑定，跳转至信息页面进行绑定，query参数作用是用来绑定之后重定向到之前的页面
    if (!userData.userInfor.giteeEmail) {
        message.warning('请先绑定 Gitee 账户')
        router.push({
            path: '/user/infor',
            query: {
                from: route.fullPath,
            }
        })
        return
    }
    // 创建文档

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
            message.success('创建成功')
            router.push('/docs/list').then(() => {
                location.reload()
            })
        } else message.warning(value.msg)
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
            router.push({
                path: '/docs/list'
            })
            message.success('创建成功')
        } else message.warning(value.msg)
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

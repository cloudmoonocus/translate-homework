<template>
    <div class="cMain">
        <!-- 头部按钮 -->
        <div class="cMain_head">
            <div class="cMain_head_left">
                <el-select v-model="createWay" placeholder="Select">
                    <el-option :label="$t('Import documents from Gitee repository')" value="url" />
                    <el-option :label="$t('Create documents from text')" value="text" />
                </el-select>
                <template v-if="createWay === 'text'">
                    <el-select v-model="sourceLan" placeholder="源语言" style="width: 100px;">
                        <el-option :label="val.label" :value="val.value" v-for="val in sourceLang" :key="val.value" />
                    </el-select>
                    <el-icon>
                        <Switch />
                    </el-icon>
                    <el-select v-model="targetLan" placeholder="目标语言" style="width: 100px;">
                        <el-option :label="val.label" :value="val.value" v-for="val in targetLang" :key="val.value" />
                    </el-select>
                </template>
            </div>
            <div class="cMain_head_right">
                <template v-if="createWay === 'text'">
                    <el-button type="primary" @click="createDocByText">{{ $t('Analysis')
                    }}</el-button>
                    <el-button type="warning" plain @click="text = ''">{{ $t('Reset text')
                    }}</el-button>
                    <el-button type="warning" plain @click="() => {
                            sourceLan = 'zh'
                            targetLan = 'en'
                        }">{{ $t('Reset language') }}</el-button>
                </template>
            </div>
        </div>
        <!-- 通过导入仓库创建 -->
        <div class="cMain_ctx cMain_gitee" v-show="createWay === 'url'">
            <el-skeleton :rows="10" v-if="userData.userInfor.giteeEmail" animated :loading="isLoading"
                style="--el-fill-color: #dedfe0;--el-fill-color-darker:#f4f4f5">
                <div class="cMain_gitee_item" v-for="rep in giteeRepository">
                    <div class="cMain_gitee_item_left">
                        <div style="display: flex;align-items: center;gap: 10px;">
                            <i class="iconfont icon-daimaguanli" style="color: #9e9dad;" v-if="!rep.fork" />
                            <i class="iconfont icon-fork" style="color: #9e9dad;" v-else />
                            <a class="link" :href="'https://gitee.com/' + rep.owner.login" target="_blank">
                                {{ rep.human_name.match(/(\S*)\//)[1] }}
                            </a>
                            <span style="color: #40485b;font-weight: bold;font-size: 17px;">/</span>
                            <a class="link" :href="rep.html_url" target="_blank">
                                {{ rep.human_name.match(/\/(\S*)/)[1] }}
                            </a>
                        </div>
                        <span v-if="rep.fork">
                            <span style="color: #6a6a6a;font-size: 13px;margin-left: 25px;">forked from：</span>
                            <a class="linkFork" :href="'https://gitee.com/' + rep.parent.owner.login" target="_blank">
                                {{ rep.parent.human_name.match(/(\S*)\//)[1] }}
                            </a>
                            <span style="color: #6a6a6a;font-weight: bold;font-size: 13px;"> / </span>
                            <a class="linkFork" :href="rep.parent.html_url" target="_blank">
                                {{ rep.parent.human_name.match(/\/(\S*)/)[1] }}
                            </a>
                        </span>
                        <span style="color: #6a6a6a;font-size: 15px;margin-left: 25px;width: 80%;">
                            {{ rep.description }}
                        </span>
                    </div>
                    <div class="cMain_gitee_item_right">
                        <el-dropdown trigger="click" max-height="200" placement="left" @visible-change="resetBranchList"
                            @command="jumpToFile">
                            <el-button type="primary" @click="getBranch(rep.full_name)">
                                {{ $t('Select branch to check') }}
                            </el-button>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item v-for="branch in branchList" icon="Paperclip"
                                        :command="[branch.name, rep.full_name, '/', false]">
                                        {{ branch.name }}
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                </div>
                <el-pagination layout="sizes, prev, pager, next" :page-sizes="[10, 20, 30, 50]" hide-on-single-page
                    v-model:current-page="currentPage" @current-change="update" v-model:page-size="pageSize"
                    @size-change="update" :total="repositoryTotal" />
            </el-skeleton>
            <el-empty description=" " v-else>
                <el-button type="primary" color="#c71d23" @click="bindGitee">
                    <template #icon>
                        <i class="iconfont icon-gitee"></i>
                    </template>
                    {{ $t('Bind Gitee account') }}
                </el-button>
            </el-empty>
        </div>
        <!-- 通过文本创建 -->
        <div class="cMain_ctx cMain_text" v-show="createWay === 'text'">
            <label>
                <span>{{ $t('Please enter the document title') }}：</span>
                <el-input v-model="docName" :placeholder="$t('Please enter the document title')" style="width: 30%;">
                </el-input>
            </label>
            <div style="margin-top: 20px;">
                <el-input v-model="text" :autosize="{ minRows: 20, maxRows: 500 }" type="textarea"
                    :placeholder="$t('Please enter the text to be parsed here')" />
            </div>
        </div>
    </div>
    <!-- 仓库列表弹出框 -->
    <el-dialog v-model="dialogVisible" :title="repositoryFile.simpleName" :show-close="false" destroy-on-close width="40%"
        style="border-radius: 15px;" @close="pathList = []">
        <div class="dialog">
            <el-breadcrumb separator="/" style="margin-top: -15px;margin-bottom: 15px;">
                <el-breadcrumb-item v-for="path in pathList">
                    <a href="javascript:void(0);"
                        @click="jumpToFile([repositoryFile.branch, repositoryFile.fullName, path, true])">
                        {{ path === '/' ? repositoryFile.fullName.match(/\/(\S*)/)[1] :
                            path.substring(path.lastIndexOf('/') + 1, path.length) }}
                    </a>
                </el-breadcrumb-item>
            </el-breadcrumb>
            <div v-loading="folderLoading" element-loading-background="rgba(225, 230, 232, .5)">
                <div class="dialog_item" v-for="file in repositoryFile.list">
                    <div class="dialog_item_left">
                        <el-icon style="font-size: 16px;">
                            <Folder v-if="file.type === 'dir'" />
                            <Document v-else />
                        </el-icon>
                        <span class="linkFork" v-if="file.type === 'dir'"
                            @click="jumpToFile([repositoryFile.branch, repositoryFile.fullName, file.path, false])">
                            {{ file.path.substring(file.path.lastIndexOf('/') +
                                1, file.path.length) }}
                        </span>
                        <a class="linkFork" :href="file.htmlUrl" target="_blank" v-else>
                            {{ file.path.substring(file.path.lastIndexOf('/') +
                                1, file.path.length) }}
                        </a>
                    </div>
                    <el-button class="dialog_item_btn" size="small" v-if="file.type === 'file'"
                        @click="createByGiteeRep(file.path)">
                        {{ $t('Import') }}
                    </el-button>
                </div>
            </div>
            <el-empty :description="$t('No Files')" v-if="!repositoryFile.list.length" />
        </div>
    </el-dialog>
    <!-- 信息弹出框 -->
    <el-dialog v-model="dialogVisibleInfor" destroy-on-close width="20%" style="border-radius: 15px;">
        <el-form label-position="top">
            <el-form-item :label="$t('Document title') + ':'">
                <el-input v-model="docName" />
            </el-form-item>
            <el-form-item :label="$t('Original language') + ':'">
                <el-select v-model="sourceLan" style="width: 100%;">
                    <el-option :label="val.label" :value="val.value" v-for="val in sourceLang" :key="val.value" />
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('Target language') + ':'">
                <el-select v-model="targetLan" style="width: 100%;">
                    <el-option :label="val.label" :value="val.value" v-for="val in targetLang" :key="val.value" />
                </el-select>
            </el-form-item>
        </el-form>
        <div style="text-align: right;">
            <el-button @click="dialogVisibleInfor = false">{{ $t('Cancel') }}</el-button>
            <el-button type="primary" @click="importDoc">
                {{ $t('Confirm') }}
            </el-button>
        </div>
    </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { createByText, getAllBranch, getRepositoryFile, createByGitUrl } from '../../api/document'
import message from '../../utils/message'
import router from '../../router'
import { useRoute } from 'vue-router'
import { sourceLang, targetLang } from '../../assets/infor/languageList'
import { useUserStore } from '../../stores/user'
import { getAllGiteeRepository } from '../../api/user'
import { useI18n } from 'vue-i18n'

const userData = useUserStore()
const route = useRoute()
const { t } = useI18n()

// 创建方式
const createWay = ref('url')

// 文档名称
const docName = ref('')

// 源语言/目标语言
const sourceLan = ref('zh')
const targetLan = ref('en')

// 获取仓库列表
const isLoading = ref(true)
const currentPage = ref(1)
const pageSize = ref(10)
const giteeRepository = ref([])
const repositoryTotal = ref(0)
function update() {
    getAllGiteeRepository(userData.userInfor.id, currentPage.value, pageSize.value).then((val) => {
        if (val.code !== 200) {
            message.error(val.msg)
        } else {
            window.scrollTo(0, 0)
            isLoading.value = false
            repositoryTotal.value = val.total
            giteeRepository.value = val.data
        }
    })
}
if (userData.userInfor.giteeEmail) {
    update()
} else message.warning('绑定 Gitee 账户之后才可导入文档')

// 获取分支
const branchList = ref([{ name: '...' }])
function getBranch(fullName) {
    getAllBranch(fullName).then((val) => {
        if (val.code !== 200) {
            message.error(val.msg)
        } else {
            branchList.value = val.data
        }
    })
}
function resetBranchList(isDown) {
    if (!isDown) {
        branchList.value = [{ name: '...' }]
    }
}

// 获取仓库文件
const dialogVisible = ref(false)
const folderLoading = ref(false)
const pathList = ref([])
const repositoryFile = ref({
    branch: '',
    fullName: '',
    simpleName: '',
    list: []
})
function jumpToFile([branch, fullName, path, isBreadclick]) {
    if (branch === '...') return
    // 点击面包屑
    if (isBreadclick) {
        let index = pathList.value.indexOf(path)
        if (index === pathList.value.length - 1) {
            return
        }
        pathList.value.splice(index + 1, pathList.value.length)
    } else pathList.value.push(path)
    folderLoading.value = true
    getRepositoryFile(fullName, branch, path).then((val) => {
        if (val.code !== 200) {
            message.error(val.msg)
        } else {
            repositoryFile.value.branch = branch
            repositoryFile.value.fullName = fullName
            repositoryFile.value.simpleName = fullName.match(/\/(\S*)/)[1]
            repositoryFile.value.list = val.data
            folderLoading.value = false
            dialogVisible.value = true
        }
    })
}

// 创建文档
// 文本创建
const text = ref('')
function createDocByText() {
    if (docName.value === '') {
        message.warning('请输入文档名称')
        return
    }
    if (text.value === '') {
        message.warning('请输入待解析的文本')
        return
    }
    createByText(docName.value, sourceLan.value, targetLan.value, text.value).then((value) => {
        if (value.code === 200) {
            reset()
            message.success('创建成功')
            router.push('/docs/list').then(() => {
                location.reload()
            })
        } else message.warning(value.msg)
    })
}
// gitee导入
const dialogVisibleInfor = ref(false)
const pathDoc = ref('')
function bindGitee() {
    // 跳转至信息页面进行绑定，query参数作用是用来绑定之后重定向到之前的页面
    router.push({
        path: '/user/infor',
        query: {
            from: route.fullPath,
        }
    })
}
function createByGiteeRep(path) {
    ElMessageBox.confirm(
        t('Are you sure you want to import this document?'),
        t('Import'),
        {
            confirmButtonText: t('Confirm'),
            cancelButtonText: t('Cancel'),
            type: 'info',
            center: true,
        }
    )
        .then(() => {
            dialogVisibleInfor.value = true
            pathDoc.value = path
        }).catch(() => {
            // 取消逻辑
            pathDoc.value = ''
        })
}
function importDoc() {
    if (docName.value === '') {
        message.warning('请输入文档名称')
        return
    }
    const data = {
        name: docName.value,
        sourceLang: sourceLan.value,
        targetLang: targetLan.value,
        fullName: repositoryFile.value.fullName,
        docUrl: pathDoc.value,
        branch: repositoryFile.value.branch
    }
    createByGitUrl(data).then((val) => {
        if (val.code !== 200) {
            message.error(val.msg)
        } else {
            message.success('导入成功！')
            router.push('/docs/list').then(() => {
                location.reload()
            })
        }
    })
}

// 清空信息
function reset() {
    text.value = ''
    docName.value = ''
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

    &_gitee {
        display: flex;
        flex-direction: column;
        align-items: center;

        &_item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 95%;
            padding: 25px 20px;
            padding-right: 50px;
            border-radius: 20px;
            background-color: #fff;
            margin-bottom: 20px;

            &_left {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                gap: 10px;
            }

            &_right {
                display: flex;
                align-items: center;
                gap: 10px;
            }
        }
    }
}

.link {
    color: #40485b;
    font-weight: bold;
    font-size: 17px;
    text-decoration: none;

    &:hover {
        color: #1283ba;
    }
}

.linkFork {
    color: #6a6a6a;
    font-size: 14px;
    text-decoration: none;

    &:hover {
        cursor: pointer;
        color: #1283ba;
    }
}

.dialog {
    width: 100%;

    &_item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        border-bottom: 1px #ccc solid;

        &_left {
            display: flex;
            align-items: flex-start;
            gap: 10px;
        }

        &_btn {
            margin-right: 25px;
        }
    }
}

:deep(.el-skeleton__item) {
    height: 25px;
}
</style>

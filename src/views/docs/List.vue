<template>
    <div class="userManage">
        <!-- 搜索 -->
        <div class="userManage_head">
            <h3>{{ $t('Document list') }}</h3>
            <el-input v-model="search" :placeholder="$t('Search document')" class="userManage_head_input" size="large">
                <template #prefix>
                    <el-icon>
                        <Search />
                    </el-icon>
                </template>
            </el-input>
        </div>
        <!-- 文档列表 -->
        <el-card v-for="docs in filterTableData" class="userManage_card" shadow="hover">
            <template #header>
                <div style="display: flex; justify-content: space-between;">
                    <div style="display: flex;align-items: center;">
                        <el-tooltip v-if="docs.docUrl" content="From gitee" placement="top">
                            <i class="iconfont icon-gitee" style="margin-right: 10px;font-size: 25px;color: #c71d23;" />
                        </el-tooltip>
                        <el-tooltip v-else content="From text" placement="top">
                            <el-icon style="margin-right: 10px;font-size: 25px;color: #585858;">
                                <Document />
                            </el-icon>
                        </el-tooltip>
                        <a style="font-weight: bold;" :href="'https://gitee.com/' + docs.fullName" target="_blank"
                            v-if="docs.docUrl">
                            {{ docs.name }}
                        </a>
                        <span style="font-weight: bold;" v-else>
                            {{ docs.name }}
                        </span>
                    </div>
                    <div v-if="userData.userInfor.role === 'root'">
                        <el-button type="info" plain @click="checkDocContent(docs.id)">
                            {{ $t('Check') }}
                        </el-button>
                        <el-button type="primary" plain @click="editDoc(docs)">
                            {{ $t('Modify document properties') }}
                        </el-button>
                        <el-button type="danger" plain @click="deleteDoc(docs.id)">
                            {{ $t('Delete') }}
                        </el-button>
                    </div>
                </div>
            </template>
            <div class="userManage_card_dec">
                <span>ID：<el-tag>{{ docs.id }}</el-tag></span>
                <span>{{ $t('Original language') }}：<el-tag>{{ docs.sourceLang }}</el-tag></span>
                <span>{{ $t('Target language') }}：<el-tag>{{ docs.targetLang }}</el-tag></span>
                <span>{{ $t('Word') }}：<el-tag>{{ docs.wordSum }}</el-tag></span>
                <span>{{ $t('Translation') }}：<el-tag>{{ docs.translationSum }}</el-tag></span>
                <span>{{ $t('Review') }}：<el-tag>{{ docs.reviewSum }}</el-tag></span>
            </div>
        </el-card>
        <!-- 分页器 -->
        <el-pagination style="margin: 15px 0;" background layout="sizes, prev, pager, next" v-model:page-size="pageSize"
            v-model:current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :total="total" />
        <!-- 弹窗：编辑文档属性 -->
        <el-dialog v-model="dialogVisible" :title="$t('Modify document properties')" width="25%"
            style="border-radius: 15px;">
            <el-form :model="newDocData" label-position="top" label-width="75px">
                <el-form-item :label="$t('Document title') + ':'">
                    <el-input v-model="newDocData.name" />
                </el-form-item>
                <el-form-item :label="$t('Original language') + ':'">
                    <el-select v-model="newDocData.sourceLang">
                        <el-option :label="val.label" :value="val.value" v-for="val in sourceLang" :key="val.value" />
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('Target language') + ':'">
                    <el-select v-model="newDocData.targetLang">
                        <el-option :label="val.label" :value="val.value" v-for="val in targetLang" :key="val.value" />
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('Translation') + ':'">
                    <el-input-number v-model="newDocData.translationSum" />
                </el-form-item>
                <el-form-item :label="$t('Review') + ':'">
                    <el-input-number v-model="newDocData.reviewSum" />
                </el-form-item>
            </el-form>
            <div style="text-align: right;">
                <el-button @click="dialogVisible = false">{{ $t('Cancel') }}</el-button>
                <el-button type="primary" @click="changeDoc">
                    {{ $t('Confirm') }}
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, watchEffect, computed } from 'vue'
import { deleteDocumentById, getAllDocument, updateDocument } from '../../api/document'
import router from '../../router'
import { useUserStore } from '../../stores/user'
import message from '../../utils/message'
import deepcopy from 'deepcopy'
import { sourceLang, targetLang } from '../../assets/infor/languageList'

const userData = useUserStore()

// 搜索
const search = ref('');

// 换页
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(10)
const docsData = ref([])
const docsDataAll = ref([])
function update() {
    // 分页信息
    getAllDocument(currentPage.value, pageSize.value).then((value) => {
        total.value = value.total
        docsData.value = value.data
    })
    // 获取全部信息
    getAllDocument(currentPage.value).then((value) => {
        docsDataAll.value = value.data
    })
}
watchEffect(update)
const filterTableData = computed(() => {
    if (search.value) {
        return docsDataAll.value.filter((data) => data.name.includes(search.value))
    } else {
        return docsData.value
    }
})

// 查看文档
function checkDocContent(id) {
    router.push({
        path: '/docDetail/' + id,
    })
}

// 编辑文档基本属性
const dialogVisible = ref(false)
const newDocData = ref([])
function editDoc(docData) {
    dialogVisible.value = true
    newDocData.value = deepcopy(docData)
    delete newDocData.value.docUrl
    delete newDocData.value.url
}
function changeDoc() {
    if (!newDocData.value.name) {
        newDocData.value.name = Date.now()
    }
    updateDocument(newDocData.value).then((val) => {
        if (val.code === 200) {
            update()
            dialogVisible.value = false
            message.success('修改成功！')
        } else {
            message.error(val.msg)
        }
    })
}

// 删除文档
function deleteDoc(id) {
    deleteDocumentById(id).then((value) => {
        if (value.code === 200) {
            message.success('删除成功')
            update()
        } else {
            message.error('删除失败')
        }
    })
}
</script>

<style lang="scss" scoped>
.userManage {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(100vw - 250px);

    &_head {
        width: 95%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &_input {
            width: 25rem;
        }
    }

    &_card {
        margin-top: 10px;
        width: 95%;

        &_dec {
            display: flex;
            flex-wrap: wrap;
            gap: 2rem;
        }
    }
}
</style>

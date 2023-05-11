<template>
    <div class="userManage">
        <!-- 搜索 -->
        <div class="userManage_head">
            <h3>文档列表</h3>
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
                    <span style="font-weight: bold;">{{ docs.name }}</span>
                    <el-button type="primary">{{ $t('Check') }}</el-button>
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
    </div>
</template>

<script setup>
import { ref, watchEffect, computed } from 'vue'
import { getAllDocument } from '../../api/document'
import message from '../../utils/message'

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

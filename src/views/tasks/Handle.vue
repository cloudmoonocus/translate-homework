<template>
    <div class="taskManage">
        <!-- 表格 -->
        <el-table :data="filterTableData" class="taskManage_table" stripe table-layout="auto">
            <el-table-column align="center" prop="id" label="ID" width="80" />
            <el-table-column align="center" prop="name" width="150" :label="$t('TaskName')" />
            <el-table-column align="center" prop="description" :label="$t('Description')">
                <template #default="scope">
                    <span :style="scope.row.description ? null : { color: '#ccc' }">
                        {{ scope.row.description || $t('None') }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="creator" width="150" :label="$t('Creator')" />
            <el-table-column align="center" prop="translator" width="150" :label="$t('Translator')">
                <template #default="scope">
                    <span :style="scope.row.translator ? null : { color: '#ccc' }">
                        {{ scope.row.translator || $t('None') }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="reviewer" width="150" :label="$t('Reviewer')">
                <template #default="scope">
                    <span :style="scope.row.reviewer ? null : { color: '#ccc' }">
                        {{ scope.row.reviewer || $t('None') }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="document" width="80" :label="$t('Doc Id')" />
            <el-table-column align="center" prop="status" :label="$t('State')" width="100">
                <template #default="scope">
                    <el-tag :type="scope.row.status === 'ed' ? 'success' : 'danger'" disable-transitions>
                        {{ scope.row.status }}
                    </el-tag>
                </template>
            </el-table-column>
            <!-- 右侧摁钮 -->
            <el-table-column fixed="right" align="center" width="250">
                <template #header>
                    <div style="display: flex; justify-content:space-evenly;align-items: center;">
                        <el-input v-model="search" :placeholder="$t('Search task')" style="width: 55%;" clearable />
                        <el-button type="primary" @click="newTask">{{ $t('A new task')
                        }}</el-button>
                    </div>
                </template>
                <template #default="scope">
                    <el-popconfirm :title="$t('Confirm to claim the translation task?')" :confirm-button-text="$t('Yes')"
                        :cancel-button-text="$t('No')" confirm-button-type="danger" cancel-button-type="primary"
                        @confirm="deletetask(scope.row)">
                        <template #reference>
                            <el-button :type="scope.row.translator ? 'info' : 'primary'" plain
                                :disabled="!!scope.row.translator">
                                {{ $t('Claim translation') }}
                            </el-button>
                        </template>
                    </el-popconfirm>
                    <el-popconfirm :title="$t('Confirm to claim the review task?')" :confirm-button-text="$t('Yes')"
                        :cancel-button-text="$t('No')" confirm-button-type="danger" cancel-button-type="primary"
                        @confirm="deletetask(scope.row)">
                        <template #reference>
                            <el-button :type="scope.row.reviewer ? 'info' : 'primary'" plain
                                :disabled="!!scope.row.reviewer">
                                {{ $t('Claim review') }}
                            </el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination style="margin: 15px 0;" background layout="sizes, prev, pager, next" v-model:page-size="pageSize"
            v-model:current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :total="total" />
        <!-- 弹窗 -->
    </div>
</template>

<script setup>
import { ref, watchEffect, computed } from 'vue'
import { getAllTask } from '../../api/task'
import message from '../../utils/message'

// 搜索
const search = ref('');

// 换页
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(10)
const taskData = ref([])
const taskDataAll = ref([])
function update() {
    // 分页信息
    getAllTask(currentPage.value, pageSize.value).then((value) => {
        total.value = value.total
        taskData.value = value.data
    })
    // 获取全部信息
    getAllTask(currentPage.value).then((value) => {
        taskDataAll.value = value.data
    })
}
watchEffect(update)
const filterTableData = computed(() => {
    if (search.value) {
        return taskDataAll.value.filter((data) => data.name.includes(search.value))
    } else {
        return taskData.value
    }
})

// 创建新任务
function newTask() {

}
</script>

<style lang="scss" scoped>
.taskManage {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(100vw - 250px);
    background-color: #fff;

    &_table {
        padding: 15px 0 0;
        width: 100%;

        :deep(.el-table__row) {
            height: 65px;
        }
    }
}
</style>

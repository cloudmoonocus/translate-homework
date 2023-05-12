<template>
    <div class="taskRelation">
        <!-- 表格 -->
        <el-table :data="filterTableData" class="taskRelation_table" stripe table-layout="auto">
            <el-table-column align="center" prop="taskId" :label="$t('Task Id')" />
            <el-table-column align="center" prop="userId" :label="$t('User Id')" />
            <el-table-column align="center" prop="relation" :label="$t('Relation')" />
            <el-table-column align="center" prop="status" :label="$t('State')">
                <template #default="scope">
                    <el-tag :type="scope.row.status === 'ed' ? 'success' : 'danger'" disable-transitions>
                        {{ scope.row.status }}
                    </el-tag>
                </template>
            </el-table-column>
            <!-- 右侧摁钮 -->
            <el-table-column width="460" fixed="right" align="center">
                <template #header>
                    <div style="display: flex; justify-content:space-evenly;align-items: center;">
                        <el-input v-model="search" :placeholder="$t('Search task')"
                            :style="userData.userInfor.role === 'root' ? { width: '55%' } : { width: '85%' }" clearable />
                        <el-button type="primary" @click="dialogVisible = true" v-if="userData.userInfor.role === 'root'">{{
                            $t('A new task')
                        }}</el-button>
                    </div>
                </template>
                <template #default="scope">
                    <el-button type="info" plain>
                        {{ $t('Document') }}
                    </el-button>
                    <el-button type="primary" plain>
                        {{ $t('Edit') }}
                    </el-button>
                    <el-button type="danger" plain @click="onDeleteTask(scope.row.taskId)">
                        {{ $t('Delete') }}
                    </el-button>
                    <el-button type="success" plain @click="onSubmitTask(scope.row.userId, scope.row.taskId)">
                        {{ $t('Submit') }}
                    </el-button>
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
import { getRelation, submitTask, deleteTask } from '../../api/task'
import { useUserStore } from '../../stores/user'
import message from '../../utils/message'

const userData = useUserStore()

// 搜索
const search = ref('');

// 换页
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(10)
const relationData = ref([])
const relationDataAll = ref([])
function update() {
    // 分页信息
    getRelation(currentPage.value, pageSize.value).then((value) => {
        total.value = value.total
        relationData.value = value.data
    })
    // 获取全部信息
    getRelation(currentPage.value).then((value) => {
        relationDataAll.value = value.data
    })
}
watchEffect(update)
const filterTableData = computed(() => {
    if (search.value) {
        return relationDataAll.value.filter((data) => data.name.includes(search.value))
    } else {
        return relationData.value
    }
})

// TODO 进入文档查看

// TODO 编辑任务

// 删除任务
function onDeleteTask(taskId) {
    deleteTask(taskId, userData.userInfor.username).then((value) => {
        if (value.code === 200) {
            update()
            message.success('删除成功')
        }
    })
}

// 提交任务
function onSubmitTask(userId, taskId) {
    submitTask(userId, taskId).then((value) => {
        if (value.code === 200) {
            message.success('提交成功')
        }
    })
}
</script>

<style lang="scss" scoped>
.taskRelation {
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

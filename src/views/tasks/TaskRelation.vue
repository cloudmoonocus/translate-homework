<template>
    <div class="taskRelation">
        <!-- 表格 -->
        <el-table :data="filterTableData" class="taskRelation_table" stripe border table-layout="fixed"
            :span-method="objectSpanMethod">
            <el-table-column align="center" prop="taskName" :label="$t('TaskName')" />
            <el-table-column align="center" prop="documentName" :label="$t('Document')" />
            <el-table-column align="center" prop="userId" :label="$t('User Id')" />
            <el-table-column align="center" prop="relation" :label="$t('Relation')" />
            <el-table-column align="center" prop="status" :label="$t('State')">
                <template #default="scope">
                    <el-tag :type="scope.row.status === 'ed' ? 'success' : 'danger'" disable-transitions>
                        {{ scope.row.status }}
                    </el-tag>
                </template>
            </el-table-column>
            <!-- 右侧摁钮(prop填入禁止合并的任意字段就可以合并) -->
            <el-table-column width="300" prop="taskName" fixed="right" align="center">
                <template #header>
                    <el-input v-model="search" :placeholder="$t('Search task')" clearable />
                </template>
                <template #default="scope">
                    <div style="margin-bottom: 15px;">
                        <el-button plain @click="checkDocContent(scope.row.documentId)">
                            {{ $t('Document') }}
                        </el-button>
                        <el-button type="primary" plain @click="editTask(scope.row)">
                            {{ $t('Edit') }}
                        </el-button>
                        <el-button type="danger" plain @click="onDeleteTask(scope.row.taskId)">
                            {{ $t('Delete') }}
                        </el-button>
                    </div>
                    <el-button type="info" plain @click="downloadDoc(scope.row.documentId, scope.row.documentName)">
                        {{ $t('Download translated doc') }}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination style="margin: 15px 0;" background layout="sizes, prev, pager, next" v-model:page-size="pageSize"
            v-model:current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :total="total" />
        <!-- 弹窗：编辑任务 -->
        <el-dialog v-model="dialogVisible" :title="$t('Edit task')" width="30%" style="border-radius: 15px;">
            <el-form :model="newTaskData" label-position="top" label-width="75px">
                <el-form-item :label="$t('TaskName') + ':'">
                    <el-input v-model="newTaskData.name" />
                </el-form-item>
                <el-form-item :label="$t('Doc Id') + ':'">
                    <el-input v-model="newTaskData.document" />
                </el-form-item>
            </el-form>
            <div style="text-align: right;">
                <el-button @click="dialogVisible = false">{{ $t('Cancel') }}</el-button>
                <el-button type="primary" @click="changeTask">
                    {{ $t('Confirm') }}
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, watchEffect, computed } from 'vue'
import { getRelation, deleteTask } from '../../api/task'
import { downloadDocument } from '../../api/document'
import { useUserStore } from '../../stores/user'
import message from '../../utils/message'
import { updateTask } from '../../api/task'
import router from '../../router'
import { loadFile } from '../../utils/downloadFile'

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

function checkDocContent(id) {
    router.push({
        path: '/docDetail/' + id,
    })
}

const dialogVisible = ref(false)
const newTaskData = ref({
    taskId: '',
    name: '',
    document: ''
})
function editTask(data) {
    dialogVisible.value = true
    newTaskData.value.taskId = data.taskId
    newTaskData.value.name = data.taskName
    newTaskData.value.document = data.documentId
}
function changeTask() {
    for (const key in newTaskData.value) {
        if (Object.hasOwnProperty.call(newTaskData.value, key)) {
            if (newTaskData.value[key] === '') {
                message.warning('请填写完整信息')
                return
            }
        }
    }
    updateTask(newTaskData.value.taskId, newTaskData.value.name, newTaskData.value.document).then((val) => {
        if (val.code === 200) {
            update()
            dialogVisible.value = false
            message.success('修改成功！')
        }
    })
}

// 删除任务
function onDeleteTask(taskId) {
    deleteTask(taskId, userData.userInfor.username).then((value) => {
        if (value.code === 200) {
            update()
            message.success('删除成功')
        }
    })
}

// 下载文档
function downloadDoc(docId, docName) {
    downloadDocument(docId).then((val) => {
        loadFile(docName, val)
    })
}

// 合并行
const objectSpanMethod = ({
    row,
    column,
    rowIndex,
    columnIndex,
}) => {
    // 拿到当前table中数据
    let data = filterTableData.value
    // 当前位置的值
    let cellValue = row[column.property]
    // 不需要合并的字段
    let noSortArr = ['userId', 'relation', 'status']

    if (cellValue && !noSortArr.includes(column.property)) {
        // 获取到上一条数据
        let prevRow = data[rowIndex - 1]
        // 下一条数据
        let nextRow = data[rowIndex + 1]
        // 当有上一条数据，并且和当前值相等时
        if (prevRow && prevRow[column.property] === cellValue) {
            return { rowspan: 0, colspan: 0 };
        } else {
            let countRowspan = 1;
            // 当有下一条数据并且和当前值相等时,获取新的下一条
            while (nextRow && nextRow[column.property] === cellValue) {
                nextRow = data[++countRowspan + rowIndex];
            }
            if (countRowspan > 1) {
                return { rowspan: countRowspan, colspan: 1 };
            }
        }
    }
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

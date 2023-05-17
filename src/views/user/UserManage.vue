<template>
    <div class="userManage">
        <!-- 表格 -->
        <el-table :data="filterTableData" class="userManage_table" stripe table-layout="auto">
            <el-table-column align="center" prop="id" label="ID" />
            <el-table-column align="center" prop="username" :label="$t('UserName')" />
            <el-table-column align="center" prop="email" :label="$t('UserEmail')" />
            <el-table-column align="center" prop="role" :label="$t('Role')">
                <template #default="scope">
                    <el-tag :type="scope.row.role === 'user' ? '' : 'danger'" disable-transitions>
                        {{ scope.row.role === 'user' ? $t('User') : $t('Root') }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" width="350">
                <template #header>
                    <div style="display: flex; justify-content:space-evenly;align-items: center;">
                        <el-input v-model="search" :placeholder="$t('Search user')" style="width: 60%;" clearable />
                        <el-button type="primary" @click="newUser">{{ $t('New User')
                        }}</el-button>
                    </div>
                </template>
                <template #default="scope">
                    <el-button @click="handleEdit(scope.row)">{{ $t('Edit') }}</el-button>
                    <el-popconfirm :title="$t('Are you sure to delete this user?')" :confirm-button-text="$t('Yes')"
                        :cancel-button-text="$t('No')" confirm-button-type="danger" cancel-button-type="primary"
                        @confirm="deleteUser(scope.row)">
                        <template #reference>
                            <el-button type="danger">
                                {{ $t('Delete') }}
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
        <InforDiglog v-model:dialogVisible="dialogVisible" :isNew="isNew" @update="update" :editData="editData">
        </InforDiglog>
    </div>
</template>

<script setup>
import { ref, watchEffect, computed } from 'vue'
import { getAllInfo } from '../../api/user'
import { deleteUserId } from '../../api/user'
import message from '../../utils/message'
import InforDiglog from '../../components/user/InforDiglog.vue'

// 搜索
const search = ref('');

// 换页
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(10)
const userData = ref([])
const userDataAll = ref([])
function update() {
    // 分页信息
    getAllInfo(currentPage.value, pageSize.value).then((value) => {
        total.value = value.total
        userData.value = value.data
    })
    // 获取全部信息
    getAllInfo(currentPage.value).then((value) => {
        userDataAll.value = value.data
    })
}
watchEffect(update)
const filterTableData = computed(() => {
    if (search.value) {
        return userDataAll.value.filter((data) => data.username.includes(search.value))
    } else {
        return userData.value
    }
})

// 操作用户
const isNew = ref(false)
const editData = ref(null)
const dialogVisible = ref(false)
function handleEdit(row) {
    isNew.value = false
    editData.value = row
    dialogVisible.value = true
}

// 删除用户
function deleteUser(row) {
    deleteUserId(row.id).then((value) => {
        if (value.code === 200) {
            update()
            message.success('删除成功')
        }
    })
}

// 新增用户
function newUser() {
    isNew.value = true
    dialogVisible.value = true
}
</script>

<style lang="scss" scoped>
.userManage {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(100vw - 250px);
    padding: 15px 0;

    &_table {
        width: 100%;

        :deep(.el-table__row) {
            height: 65px;
        }
    }
}
</style>

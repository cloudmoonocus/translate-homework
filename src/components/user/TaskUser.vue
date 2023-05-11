<template>
    <div class="uMain_right">
        <el-descriptions :title="$t('Recent tasks')" :column="3" border class="uMain_right_tasks"
            v-if="userData.userInfor.task.length">
            <div v-for="val in userData.userInfor.task" :key="val.name">
                <el-descriptions-item align="center" :label="$t('TaskName')">
                    {{ val.name }}
                </el-descriptions-item>
                <el-descriptions-item align="center" :label="$t('Identity')">
                    <el-tag>{{ val.relation }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item align="center" :label="$t('State')">
                    <el-tag :type="val.status === 'ed' ? '' : 'danger'">
                        {{ val.status }}
                    </el-tag>
                </el-descriptions-item>
            </div>
        </el-descriptions>
        <el-empty description="暂无任务" class="uMain_right_tasks" v-else />
    </div>
</template>

<script setup>
import { useUserStore } from '../../stores/user'
// import { getTask } from '../../api/task'

const userData = useUserStore()

// 最近任务
// 为任务添加信息
// userData.userInfor.task.forEach((task) => {
//     getTask(task.taskId).then((val) => {
//         task.data = val.data
//     })
// })


// TODO 记录
// console.log(userData.userInfor.record)
/**
 * en-US: {translationSum: 0, reviewSum: 0}
 */
</script>

<style lang="scss" scoped>
.uMain_right {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 70%;
    height: 100%;

    &_tasks {
        margin-top: 15vh;
        width: 85%;
    }
}

.cell-item {
    display: flex;
    align-items: center;
}
</style>

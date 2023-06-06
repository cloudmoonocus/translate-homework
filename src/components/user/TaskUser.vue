<template>
    <div class="uMain_right">
        <!-- 贡献记录 -->
        <el-descriptions
            :title="$t('Contribution record')"
            :column="3"
            border
            class="uMain_right_record"
            v-if="Object.keys(userData.userInfor.record).length"
        >
            <div v-for="(val, key) in userData.userInfor.record" :key="val.name">
                <el-descriptions-item align="center" :label="$t('Language')">
                    {{ key }}
                </el-descriptions-item>
                <el-descriptions-item align="center" :label="$t('Translation')">
                    <el-tag type="success">{{ val.reviewSum }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item align="center" :label="$t('Review')">
                    <el-tag type="success">
                        {{ val.translationSum }}
                    </el-tag>
                </el-descriptions-item>
            </div>
        </el-descriptions>
        <el-empty :description="$t('No contribution record')" class="uMain_right_recordEmpty" v-else />
        <!-- 最近任务 -->
        <el-descriptions
            :title="$t('Recent tasks')"
            :column="4"
            border
            class="uMain_right_tasks"
            v-if="userData.userInfor.task.length"
        >
            <div v-for="val in userData.userInfor.task" :key="val.name">
                <el-descriptions-item align="center" :label="$t('TaskName')">
                    <span :title="val.name">{{ val.name }}</span>
                </el-descriptions-item>
                <el-descriptions-item align="center" :label="$t('Identity')">
                    <el-tag>{{ val.relation }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item align="center" :label="$t('State')">
                    <el-tag :type="val.status === 'ed' ? 'success' : 'danger'">
                        {{ val.status }}
                    </el-tag>
                </el-descriptions-item>
                <!-- 查看 -->
                <el-descriptions-item align="center" :label="$t('Operation')">
                    <el-button
                        v-if="val.status === 'ed' && val.relation === 'translator'"
                        type="danger"
                        plain
                        @click="backStatusw(val.taskId)"
                    >
                        {{ $t('Re-edit') }}
                    </el-button>
                    <el-button
                        v-else
                        type="primary"
                        plain
                        :disabled="
                            (val.status === 'ed' && val.relation !== 'creator') ||
                            (val.status === 'translating' && val.relation === 'reviewer')
                        "
                        @click="checkDoc(val.data.document, val.taskId)"
                    >
                        {{ $t('Check') }}
                    </el-button>
                </el-descriptions-item>
            </div>
        </el-descriptions>
        <el-empty :description="$t('No task record')" class="uMain_right_tasksEmpty" v-else />
    </div>
</template>

<script setup>
import router from '../../router'
import { useUserStore } from '../../stores/user'
import { backToTranslate, getTask } from '../../api/task'
import { getInfo } from '../../api/user'
import message from '../../utils/message'

const userData = useUserStore()

// 最近任务
// 为任务添加信息
const requestArray = []
const isLogin = !!localStorage.getItem('Authorization')
function getInfoData() {
    getInfo(localStorage.getItem('id')).then((val) => {
        if (val.code === 200) {
            userData.userInfor = val.data
            userData.userInfor.task.forEach((task) => {
                requestArray.push(getTask(task.taskId))
            })
            Promise.all(requestArray).then((val) => {
                userData.userInfor.task.forEach((task, index) => {
                    task.data = val[index].data
                })
            })
        }
    })
}
if (isLogin) {
    getInfoData()
}

// 查看文档
function checkDoc(docID, taskID) {
    userData.currentTaskID = taskID
    router
        .push({
            path: '/docDetail/' + docID,
        })
        .then(null, () => {
            userData.currentTaskID = 0
        })
}

// 回退至翻译状态
function backStatusw(taskID) {
    backToTranslate(taskID).then((val) => {
        if (val.code === 200) {
            getInfoData()
            message.success('回退成功')
        } else {
            message.error(val.msg)
        }
    })
}
</script>

<style lang="scss" scoped>
.uMain_right {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 70%;
    height: 100%;

    &_record {
        margin-top: 10vh;
        width: 88%;
    }

    &_recordEmpty {
        margin-top: 5vh;
        width: 88%;
    }

    &_tasks {
        margin-top: 8vh;
        width: 88%;
    }

    &_tasksEmpty {
        margin-top: 5vh;
        width: 88%;
    }
}

.cell-item {
    display: flex;
    align-items: center;
}
</style>

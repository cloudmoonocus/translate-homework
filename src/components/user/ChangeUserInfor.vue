<template>
    <el-dialog v-model="dialogVisible" width="25%" style="border-radius: 15px;" title="更新用户信息">
        <el-form :model="infor" label-position="top" label-width="75px">
            <el-form-item :label="$t('UserName') + ':'">
                <el-input v-model="infor.username" />
            </el-form-item>
            <el-form-item :label="$t('UserEmail') + ':'">
                <el-input v-model="infor.email" />
            </el-form-item>
            <el-form-item :label="$t('OldPassword') + ':'">
                <el-input v-model="infor.password" />
            </el-form-item>
            <el-form-item :label="$t('NewPassword') + ':'">
                <el-input v-model="infor.password" />
            </el-form-item>
            <div style="text-align: right;">
                <el-button @click="dialogVisible = false">{{ $t('Cancel') }}</el-button>
                <el-button type="primary" @click="change">
                    {{ $t('Confirm') }}
                </el-button>
            </div>
        </el-form>
    </el-dialog>
</template>

<script setup>
import { computed, ref, toRefs } from 'vue'
import message from '../../utils/message'
import { changeInfo } from '../../api/user'

// 显示与隐藏
const props = defineProps(['dialogVisible', 'root', 'userData'])
const emit = defineEmits(['update:dialogVisible'])
const dialogVisible = computed({
    get() {
        return props.dialogVisible
    },
    set(value) {
        emit('update:dialogVisible', value)
    }
})

// 信息
const { userData } = toRefs(props)
const infor = ref({
    id: userData.value.id,
    username: userData.value.username,
    email: userData.value.email,
    oldPassword: '',
    newPassword: '',
})

// 清空信息
function clearInfor() {
    infor.value = {
        id: '',
        usename: '',
        email: '',
        oldPassword: '',
        newPassword: '',
    }
}

// 修改信息
function change() {
    let currentData = JSON.parse(JSON.stringify(infor.value))
    if (currentData.username === userData.value.username) {
        delete currentData.username
    }
    if (currentData.email === userData.value.email) {
        delete currentData.email
    }
    if (currentData.oldPassword === '' || currentData.newPassword === '') {
        delete currentData.oldPassword
        delete currentData.newPassword
    }
    if (Object.keys(currentData).length === 1) {
        message.warning('您未修改任何信息！')
    } else {
        changeInfo(currentData).then(() => {
            message.success('修改成功！')
            clearInfor()
            dialogVisible.value = false
        })
    }
}
</script>

<style lang="scss" scoped>
</style>

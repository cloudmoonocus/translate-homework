<template>
    <el-dialog v-model="dialogVisible" width="20%" class="diglog">
        <el-form :model="infor" label-position="top" label-width="75px">
            <el-form-item :label="$t('Username') + ':'">
                <el-input v-model="infor.name" />
            </el-form-item>
            <el-form-item :label="$t('UserEmail') + ':'">
                <el-input v-model="infor.email" />
            </el-form-item>
            <el-form-item :label="$t('Password') + ':'">
                <el-input v-model="infor.password" />
            </el-form-item>
            <el-form-item :label="$t('RepeatPassword') + ':'">
                <el-input v-model="infor.repeatPassword" />
            </el-form-item>
            <el-form-item :label="$t('Root') + ':'">
                <el-switch v-model="infor.role" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span>
                <el-button @click="dialogVisible = false">{{ $t('Cancel') }}</el-button>
                <el-button type="primary" @click="handle">
                    {{ $t('Confirm') }}
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { computed, ref } from 'vue';
import { addUserAdmin } from '../../api/user';
import { signInforRight } from '../../utils/signInforRight';
import message from '../../utils/message';

// 显示与隐藏
const props = defineProps(['dialogVisible', 'isNew'])
const emit = defineEmits(['update:dialogVisible', 'update'])
const dialogVisible = computed({
    get() {
        return props.dialogVisible
    },
    set(value) {
        emit('update:dialogVisible', value)
    }
})

// 信息
const infor = ref({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    role: false,
    isRegister: true
})

// 清空信息
function clearInfor() {
    infor.value = {
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
        role: false,
        isRegister: true
    }
}

// 操作
function handle() {
    if (props.isNew) {
        signInforRight(infor.value).then(() => {
            addUserAdmin(infor.value.name, infor.value.password, infor.value.email, infor.value.role).then((value) => {
                if (value.code === 200) {
                    emit('update')
                    clearInfor()
                    dialogVisible.value = false
                    message.success('新建用户成功')
                } else {
                    message.error(value.msg)
                }
            })
        }, (error) => {
            message.error(error)
        })
    } else {
        clearInfor()
        dialogVisible.value = false
    }
}
</script>

<style lang="scss" scoped>
</style>

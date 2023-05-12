<template>
    <div class="main">
        <div class="main_ctx">
            <div class="main_ctx_title">{{ $t('Registration entry') }}</div>
            <div class="main_ctx_intro">{{ $t('Welcome') }}</div>
            <div class="main_ctx_form">
                <el-form :model="signUpData" label-width="auto">
                    <el-form-item :label="$t('UserName')" required>
                        <el-input v-model="signUpData.name" :suffix-icon="User" />
                    </el-form-item>
                    <el-form-item :label="$t('UserEmail')" required>
                        <el-input v-model="signUpData.email" :suffix-icon="Message" />
                    </el-form-item>
                    <el-form-item :label="$t('Password')" required>
                        <el-input v-model="signUpData.password" :suffix-icon="Lock" type="password" show-password />
                    </el-form-item>
                    <el-form-item :label="$t('RepeatPassword')" required>
                        <el-input v-model="signUpData.repeatPassword" :suffix-icon="Lock" type="password" show-password />
                    </el-form-item>
                </el-form>
            </div>
            <div class="main_ctx_btn">
                <el-button :type="signUpData.isVerify ? 'success' : 'info'" plain :disabled="signUpData.isVerify"
                    @click="dialogVisible = true">
                    {{ signUpData.isVerify ? $t('VerifySuccess') : $t('Verify') }}
                </el-button>
                <el-button type="primary" @click="submitForm">{{ $t('Register') }}</el-button>
                <el-button @click="resetForm">{{ $t('Reset') }}</el-button>
            </div>
        </div>
        <el-dialog v-model="dialogVisible" width="23%" class="main_verify" :show-close="false" destroy-on-close>
            <Verify @success="onVerifySuccess"></Verify>
        </el-dialog>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { User, Lock, Message } from '@element-plus/icons-vue'
import Verify from '../components/Verify.vue'
import { register } from '../api/user'
import { signInforRight } from '../utils/signInforRight'
import message from '../utils/message'

// 注册信息
const signUpData = reactive({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    isVerify: false,
    isRegister: true
})

// 验证
const dialogVisible = ref(false)
function onVerifySuccess() {
    signUpData.isVerify = true
    dialogVisible.value = false
}

// 注册
function submitForm() {
    signInforRight(signUpData).then(() => {
        if (signUpData.isVerify) {
            const registerData = {
                username: signUpData.name,
                password: signUpData.password,
                email: signUpData.email
            }
            register(registerData).then(() => {
                if (val.code !== 200) {
                    message.error(val.msg)
                } else {
                    signUpData.isVerify = false
                    message.success('注册成功')
                }
            })
        } else message.warning('请进行安全验证')
    }, (error) => {
        message.warning(error)
    })
}

// 重置表单
function resetForm() {
    signUpData.name = ''
    signUpData.email = ''
    signUpData.password = ''
    signUpData.repeatPassword = ''
    signUpData.isVerify = false
}
</script>

<style lang="scss" scoped>
.main {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background-color: #F2F6FC;

    min-height: calc(100vh - 70px);
}

.main_ctx {
    margin-top: 10vh;
    padding: 4vh 0 8vh;

    width: 40vw;

    border-radius: 15px;
    background-color: #fefefe;
    border: 1px #ccc solid;

    display: flex;
    flex-direction: column;
    align-items: center;

    &_title {
        font-size: var(--fontSizeXXLarge);
        font-weight: 700;
        line-height: 5rem;

        background: -webkit-linear-gradient(315deg, #5094e2 25%, #0e27a3);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    &_intro {
        margin-top: 3vh;
        font-size: var(--fontSizeXLarge);
        font-weight: 500;
        line-height: 2rem;

        background: -webkit-linear-gradient(315deg, #678d9d 25%, #2f4d99);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    &_form {
        margin-top: 5vh;
        width: 70%;
        height: auto;
    }

    &_btn {
        margin-top: 3vh;
        width: auto;
        display: flex;
        justify-content: space-between;
    }
}

:deep(.main_verify) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 300px;
}

:deep(.el-dialog__header) {
    display: none;
}
</style>

<template>
    <div class="main">
        <div class="main_ctx">
            <div class="main_ctx_title">{{ $t('Registration entry') }}</div>
            <div class="main_ctx_intro">{{ $t('Welcome') }}</div>
            <div class="main_ctx_form">
                <el-form :model="signInData" label-width="auto">
                    <el-form-item :label="$t('Username')" required>
                        <el-input v-model="signInData.name" :suffix-icon="User" />
                    </el-form-item>
                    <el-form-item :label="$t('Password')" required>
                        <el-input v-model="signInData.password" :suffix-icon="Lock" />
                    </el-form-item>
                    <el-form-item :label="$t('RepeatPassword')" required>
                        <el-input v-model="signInData.repeatPassword" :suffix-icon="Lock" />
                    </el-form-item>
                </el-form>
            </div>
            <div class="main_ctx_verify">
                <el-button :type="signInData.isVerify ? 'success' : 'info'" plain :disabled="signInData.isVerify"
                    @click="dialogVisible = true">
                    {{ signInData.isVerify ? $t('VerifySuccess') : $t('Verify') }}
                </el-button>
            </div>
            <div class="main_ctx_btn">
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
import { reactive, ref } from 'vue';
import { User, Lock } from '@element-plus/icons-vue'
import Verify from '../components/Verify.vue';

// 注册信息
const signInData = reactive({
    name: '',
    password: '',
    repeatPassword: '',
    isVerify: false
})

// 验证
const dialogVisible = ref(false)
function onVerifySuccess() {
    signInData.isVerify = true
    dialogVisible.value = false
}

// 注册
function submitForm() {
    alert('登录');
}

// 重置表单
function resetForm() {
    signInData.name = ''
    signInData.password = ''
    signInData.repeatPassword = ''
    signInData.isVerify = false
}
</script>

<style lang="scss" scoped>
.main {
    display: flex;
    justify-content: center;
    background-color: #F2F6FC;

    min-height: calc(100vh - 70px);
}

.main_ctx {
    margin-top: 10vh;

    width: 45vw;
    min-height: 60vh;
    height: 65vh;

    border-radius: 15px;
    background-color: #fefefe;
    border: 1px #ccc solid;

    display: flex;
    flex-direction: column;
    align-items: center;

    &_title {
        margin-top: 4vh;
        font-size: var(--fontSizeXmLarge);
        font-weight: 700;
        line-height: 50px;

        background: -webkit-linear-gradient(315deg, #5094e2 25%, #0e27a3);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    &_intro {
        margin-top: 3vh;
        font-size: var(--fontSizeLarge);
        font-weight: 500;

        background: -webkit-linear-gradient(315deg, #678d9d 25%, #2f4d99);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    &_form {
        margin-top: 5vh;
        width: 60%;
    }

    &_btn {
        margin-top: 5vh;
        width: 25%;
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

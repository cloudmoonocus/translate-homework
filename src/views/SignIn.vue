<template>
    <div class="main">
        <div class="main_ctx">
            <div class="main_ctx_title">{{ $t('Welcome') }}</div>
            <div class="main_ctx_intro">{{ $t('G11N') }}</div>
            <div class="main_ctx_form">
                <el-form :model="signInData" label-width="auto">
                    <el-form-item :label="$t('Username')" required>
                        <el-input v-model="signInData.name" :suffix-icon="User" />
                    </el-form-item>
                    <el-form-item :label="$t('Password')" required>
                        <el-input v-model="signInData.password" :suffix-icon="Lock" />
                    </el-form-item>
                </el-form>
            </div>
            <div class="main_ctx_btn">
                <el-button :type="signInData.isVerify ? 'success' : 'info'" plain :disabled="signInData.isVerify"
                    @click="dialogVisible = true">
                    {{ signInData.isVerify ? $t('VerifySuccess') : $t('Verify') }}
                </el-button>
                <el-button type="primary" @click="submitForm">{{ $t('Login') }}</el-button>
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

// 登录信息
const signInData = reactive({
    name: '',
    password: '',
    isVerify: false
})

// 验证
const dialogVisible = ref(false)
function onVerifySuccess() {
    signInData.isVerify = true
    dialogVisible.value = false
}

// 登录
function submitForm() {
    alert('登录');
}

// 重置表单
function resetForm() {
    signInData.name = ''
    signInData.password = ''
    signInData.isVerify = false
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

:deep(.el-dialog__header) {
    display: none;
}
</style>

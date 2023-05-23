<template>
    <div class="uMain_left">
        <div class="ctx">
            <el-avatar class="uMain_left_ava">
                {{ userData.userInfor.username.substring(0, 1) }}
            </el-avatar>
            <div class="uMain_left_name">
                <el-icon>
                    <User />
                </el-icon>
                <span>{{ userData.userInfor.username }}</span>
            </div>
            <div class="uMain_left_email">
                <el-icon>
                    <Message />
                </el-icon>
                <span>{{ userData.userInfor.email }}</span>
            </div>
            <div class="uMain_left_ctb">
                <el-icon>
                    <StarFilled />
                </el-icon>
                <span> {{ $t('Contribution') }}：{{ userData.userInfor.contribution }}</span>
            </div>
            <div class="uMain_left_btn">
                <el-button class="uMain_left_btn_item" type="primary" :icon="Edit" @click="dialogVisible = true">
                    {{ $t('Modify information') }}
                </el-button>
                <el-button class="uMain_left_btn_item" type="primary" color="#c71d23" @click="onbindingGiteeBtn">
                    <template #icon>
                        <i class="iconfont icon-gitee"></i>
                    </template>
                    {{ userData.userInfor.giteeEmail ? userData.userInfor.giteeEmail : $t('Bind Gitee account') }}
                </el-button>
            </div>
        </div>
        <!-- 修改用户信息 -->
        <ChangeUserInfor v-if="dialogVisible" v-model:dialogVisible="dialogVisible" :userData="userData.userInfor"
            :root="userData.userInfor.role === 'root'"></ChangeUserInfor>
        <!-- 绑定gitee -->
        <el-dialog v-model="dialogVisible_Gitee" width="25%" style="border-radius: 15px;" :title="$t('Bind Gitee account')">
            <el-form :model="giteeInfor" label-position="top" label-width="75px">
                <el-form-item :label="'Gitee ' + $t('UserEmail') + ':'">
                    <el-input v-model="giteeInfor.email" />
                </el-form-item>
                <el-form-item :label="'Gitee ' + $t('Password') + ':'">
                    <el-input v-model="giteeInfor.password" />
                </el-form-item>
                <div style="text-align: right;">
                    <el-button @click="dialogVisible_Gitee = false">{{ $t('Cancel') }}</el-button>
                    <el-button type="primary" @click="onBindGitee">
                        {{ $t('Confirm') }}
                    </el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script setup>
import { Edit, Message } from '@element-plus/icons-vue'
import { useUserStore } from '../../stores/user'
import ChangeUserInfor from './ChangeUserInfor.vue'
import { ref } from 'vue'
import message from '../../utils/message'
import { bindingGitee } from '../../api/user'
import { useRoute } from 'vue-router'
import router from '../../router'

const userData = useUserStore()
const route = useRoute()
const dialogVisible = ref(false)
const dialogVisible_Gitee = ref(false)

// 绑定 gitee
const reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
const giteeInfor = ref({
    email: '',
    password: ''
})
function onbindingGiteeBtn() {
    if (!userData.userInfor.giteeEmail) {
        dialogVisible_Gitee.value = true
        return
    }
    window.open('https://gitee.com')
}
function onBindGitee() {
    if (!reg.test(giteeInfor.value.email)) {
        message.warning('邮箱格式不正确')
        return
    }
    if (!giteeInfor.value.password) {
        message.warning('请填写密码')
        return
    }
    bindingGitee(userData.userInfor.id, giteeInfor.value.email, giteeInfor.value.password).then((val) => {
        if (val.code !== 200) {
            message.error(val.msg)
        } else {
            message.success('绑定成功')
            location.reload()
        }
    })
}
// 别的地方跳转来进行绑定
if (route.query.from) {
    if (!userData.userInfor.giteeEmail) {
        dialogVisible_Gitee.value = true
    } else {
        router.replace(route.query.from)
    }
}
</script>

<style lang="scss" scoped>
.uMain_left {
    width: 30%;
    height: 100%;
    border-right: 1px #dcdfe6 solid;

    font-size: var(--fontSizeXLarge);

    &_ava {
        margin-top: 15vh;
        width: 8rem;
        height: 8rem;
        font-size: var(--fontSizeXXLarge);
    }

    &_email,
    &_ctb {
        font-size: var(--fontSizeMedium);
    }

    &_ava,
    &_name,
    &_email,
    &_ctb {
        display: flex;
        align-items: center;
        gap: 5px;
    }

    &_btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;

        &_item {
            width: auto;
            margin: 0;
        }
    }
}

.ctx {
    position: sticky;
    top: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;

    width: 100%;
}
</style>

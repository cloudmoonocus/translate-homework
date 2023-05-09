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
                <el-button type="primary" :icon="Edit" @click="dialogVisible = true">{{ $t('Modify information')
                }}</el-button>
            </div>
        </div>
        <ChangeUserInfor v-if="dialogVisible" v-model:dialogVisible="dialogVisible" :userData="userData.userInfor"
            :root="userData.userInfor.role === 'root'"></ChangeUserInfor>
    </div>
</template>

<script setup>
import { Edit } from '@element-plus/icons-vue'
import { useUserStore } from '../../stores/user'
import ChangeUserInfor from './ChangeUserInfor.vue'
import { ref } from 'vue'

const userData = useUserStore()
const dialogVisible = ref(false)
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

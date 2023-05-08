<template>
    <div class="uMain">
        <div class="uMain_left uMain_item">
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
                <el-button type="primary" :icon="Edit">{{ $t('Modify information') }}</el-button>
            </div>
        </div>
        <div class="uMain_right uMain_item">222</div>
    </div>
</template>

<script setup>
import { Edit } from '@element-plus/icons-vue'
import { useUserStore } from '../../stores/user'
const userData = useUserStore()
</script>

<style lang="scss" scoped>
.uMain {
    display: flex;
    justify-content: center;
    align-items: center;

    width: calc(100vw - 250px);

    &_item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    &_left {
        width: 30%;
        height: 100%;
        gap: 25px;

        font-size: var(--fontSizeXLarge);

        &_ava {
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

    &_right {
        width: 70%;
        height: 100%;
    }
}
</style>

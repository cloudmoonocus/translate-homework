<template>
    <div class="main">
        <div class="main_left">
            <img class="main_left_img" src="../assets/images/Teamwork.svg" alt="teamwork">
        </div>
        <div :class="{ main_right_zh: locale === 'zh', main_right_en: locale === 'en' }">
            <span class="main_right_1">
                {{ $t('we originate from the community, gather ideas and translate widely') }}
            </span>
            <span class="main_right_2">
                {{ $t('Thank you for the contribution of localization of software, documents and websites') }}
            </span>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
</script>

<style lang="scss" scoped>
.main {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    width: 100%;
    min-height: calc(100vh - 70px);

    &_left {
        width: 40%;
        height: 100%;

        &_img {
            width: 100%;
        }
    }

    &_right_zh {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        width: 45%;

        background: -webkit-linear-gradient(315deg, #5094e2 25%, #0e27a3);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        .main_right_1 {
            font-size: var(--fontSizeXXXLarge);
            font-weight: 700;
        }

        .main_right_2 {
            margin-top: 3vh;
            font-size: var(--fontSizeXLarge);
            font-weight: 400;
        }
    }

    &_right_en {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 40%;

        background: -webkit-linear-gradient(315deg, #5094e2 25%, #0e27a3);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        .main_right_1 {
            text-align: center;
            font-size: var(--fontSizeXXLarge);
            font-weight: 700;
        }

        .main_right_2 {
            text-align: center;
            margin-top: 3vh;
            font-size: var(--fontSizeXLarge);
            font-weight: 400;
        }
    }
}
</style>

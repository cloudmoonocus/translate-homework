<template>
    <slide-verify :l="42" :r="10" :w="300" :h="200" ref="block" :imgs="imgs" :slider-text="$t('VerifyText')"
        @again="onAgain" @success="onSuccess" @fail="onFail" @refresh="onRefresh"></slide-verify>
</template>

<script setup>
import { ref } from "vue";
import SlideVerify from "vue3-slide-verify";
import "vue3-slide-verify/dist/style.css";
import varify1 from "../assets/images/varify1.jpg";
import varify2 from "../assets/images/varify2.jpg";
import varify3 from "../assets/images/varify3.jpg";
import varify4 from "../assets/images/varify4.jpg";

const block = ref(null);
const imgs = ref([varify1, varify2, varify3, varify4]);
const emit = defineEmits(["success"]);

const onAgain = () => {
    // 刷新
    block.value?.refresh();
};

const onSuccess = () => {
    emit("success");
};

const onFail = () => {
    // 不通过
};

const onRefresh = () => {
    // 点击了小图标
};

const handleClick = () => {
    // 刷新
    block.value?.refresh();
};
</script>

<style lang="scss" scoped >
:deep(.slide-verify-slider) {
    border: 0 !important;
    margin-top: 0 !important;
}
</style>

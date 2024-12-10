<template>
    <ContextBox>공지사항</ContextBox>
    <NoticeSearch />
    <NoticeMain />
</template>

<script setup>
import NoticeMain from '../../components/page/Board/Notice/NoticeMain.vue';
import NoticeSearch from '../../components/page/Board/Notice/NoticeSearch.vue';

// 제공할 데이터
const providedValue = ref();

// 데이터 제공
provide('providedValue', providedValue);
</script>

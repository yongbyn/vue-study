<template>
  <ContextBox>공지사항</ContextBox>
  <NoticeSearch />
  <NoticeMain />
</template>

<script setup>
const providedValue = ref();

provide("providedValue", providedValue);
</script>

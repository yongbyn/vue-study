<template>
  <div class="search-box">
    <input v-model.lazy="keyword" />
    <input type="date" v-model="searchStartDate" />
    <input type="date" v-model="searchEndDate" />
    <button @click="handlerSearch">검색</button>
    <button @click="handlerModal">신규등록</button>
  </div>
</template>

<!-- setup 입력하면 js처럼 사용 가능 -->
<script setup>
import router from "@/router";
import { useModalStore } from "../../../../stores/modalState";

const keyword = ref("");
const searchStartDate = ref("");
const searchEndDate = ref("");
const modalState = useModalStore();

const handlerSearch = () => {
  const query = [];
  !keyword.value || query.push(`searchTitle=${keyword.value}`);
  !searchStartDate.value || query.push(`searchStDate=${searchStartDate.value}`);
  !searchEndDate.value || query.push(`searchSEdDate=${searchEndDate.value}`);

  const queryString = query.length > 0 ? `?${query.join("&")}` : "";

  router.push(queryString);
};

const handlerModal = () => {
  modalState.setModalState();
};

// watch : 인자로 받는 함수 안에 반응형 객체(ex. ref)가 있으면 객체가 변경될 때 마다 해당 함수를 실행
// watchEffect : watch랑 같은 기능이지만 인자 없이 함수실행 가능 => 새로고침 누르면 최초 한 번 실행
watchEffect(
  () => window.location.search && router.push(window.location.pathname), // 새로고침하면 처음으로 돌아가게함
  { replace: true }
);
</script>

<style lang="scss" scoped>
.search-box {
  margin-bottom: 10px;
  display: block;
  float: inline-end;
}

input {
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border: none;
  color: white;
  width: 70px;
  padding-top: 8px;
  padding-bottom: 8px;
  font-size: 12px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 12px;
  box-shadow: 0 4px #999;
  background-color: #3bb2ea;

  &:hover {
    background-color: #45a049;
  }

  &:active {
    background-color: #3e8e41;
    box-shadow: 0 2px #666;
    transform: translateY(2px);
  }
}
</style>

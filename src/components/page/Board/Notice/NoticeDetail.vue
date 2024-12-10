<template>
    <div>
        <div>
            <label> 제목 :<input type="text" /> </label>
            <label>
                내용 :
                <input type="text" />
            </label>
            파일 :<input type="file" style="display: none" id="fileInput" />
            <label class="img-label" htmlFor="fileInput"> 파일 첨부하기 </label>
            <div>
                <div v-if="imageUrl">
                    <label>미리보기</label>
                    <img :src="imageUrl" />
                </div>
                <div v-else>
                    <label>파일명</label>
                </div>
            </div>
            <div class="button-box">
                <button>
                    {{ '저장' }}
                </button>
                <button>삭제</button>
                <button>나가기</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router';

const { params } = useRoute();
</script>
<style lang=""></style>

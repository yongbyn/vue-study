<template>
    <div>
        <div>
            <ContextBox>공지사항 상세조회</ContextBox>
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
                <div v-else><label>파일명</label></div>
            </div>
            <div class="button-box">
                <button>
                    {{ '저장' }}
                </button>
                <button>삭제</button>
                <button @click="router.go(-1)">뒤로가기</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';

const { params } = useRoute();
const router = useRouter();
</script>
<style lang="scss" scoped>
img {
    width: 100px;
    height: 100px;
}

.img-label {
    margin-top: 10px;
    padding: 6px 25px;
    background-color: #ccc;
    border-radius: 4px;
    color: rgba(0, 0, 0, 0.9);
    cursor: pointer;

    &:hover {
        background-color: #45a049;
        color: white;
    }

    &:active {
        background-color: #3e8e41;
        box-shadow: 0 2px #666;
        transform: translateY(2px);
    }
}
label {
    display: flex;
    flex-direction: column;
}

input[type='text'] {
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
}
.button-box {
    text-align: right;
    margin-top: 10px;
}
button {
    background-color: #3bb2ea;
    border: none;
    color: white;
    padding: 10px 22px;
    text-align: right;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 12px;
    box-shadow: 0 4px #999;
    transition: 0.3s;

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

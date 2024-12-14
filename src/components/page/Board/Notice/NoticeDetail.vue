<template>
    <div>
        <div v-if="isLoading">기다려주세요</div>
        <div v-else>
            <ContextBox>공지사항 상세조회</ContextBox>
            <label> 제목 :<input type="text" v-model.lazy="detailValue.title" /> </label>
            <label>
                내용 :
                <input type="text" v-model.lazy="detailValue.content" />
            </label>
            파일 :<input type="file" style="display: none" id="fileInput" @change="handlerFile" />
            <label class="img-label" htmlFor="fileInput"> 파일 첨부하기 </label>
            <div>
                <div v-if="imageUrl">
                    <label>미리보기</label>
                    <img :src="imageUrl" />
                </div>
                <div v-else><label>파일명</label> {{ fileData?.name || noticeDetail?.file_name }}</div>
            </div>
            <div class="button-box">
                <button @click="params.idx ? noticeUpdate() : noticeInsert()">
                    {{ params.idx ? '수정' : '저장' }}
                </button>
                <button v-if="params.idx" @click="noticeDelete">삭제</button>
                <button @click="router.go(-1)">뒤로가기</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { useNoticeDetail } from '../../../../hook/notice/useNoticeDetail';
import { useUserInfo } from '../../../../stores/userInfo';
import { useNoticeSaveMutation } from '../../../../hook/notice/useNoticeSaveMutation';
import { useNoticeUpdateMutation } from '../../../../hook/notice/useNoticeUpdateMutation';
import { useNoticeDeleteMutation } from '../../../../hook/notice/useNoticeDeleteMutation';

const { params } = useRoute();
const router = useRouter();
const fileData = ref('');
const imageUrl = ref('');
const userInfo = useUserInfo();
const detailValue = ref(new Object());
const queryClient = useQueryClient();

// const searchDetail = async () => {
//     const result = await axios.post('/api/board/noticeDetailBody.do', {
//         noticeSeq: params.idx,
//     });
//     return result.data;
// };

// const { data: noticeDetail, isLoading } = useQuery({
//     queryKey: ['detailList'],
//     queryFn: searchDetail,
// });

// 파일 미리보기
const fileDownload = async (flag) => {
    let param = new URLSearchParams();
    param.append('noticeSeq', params.idx);

    const postAction = {
        url: '/api/board/noticeDownload.do',
        method: 'POST',
        data: param,
        responseType: 'blob',
    };

    await axios(postAction).then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        if (flag === 'preview') {
            imageUrl.value = url;
        } else {
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', noticeDetail.value.file_name);
            document.body.appendChild(link);
            link.click();

            link.remove(); // 메모리 누수 방지
        }
    });
};

const { data: noticeDetail, isLoading, isSuccess } = useNoticeDetail(params.idx);

// watchEffect은 의존성을 자동으로 추적한다
watchEffect(() => {
    if (isSuccess.value && noticeDetail.value) {
        // toRaw 프록시로 감싸진 데이터를 원본 객체로 반환함
        // proxy는 객체의 기본 동작을 가로채서 원하는 방식으로 처리함 ex) vue에서는 데이터가 변경이되었을 때, 반응성을 유지하도록 커스터마이즈가 된 것
        // tanstack에서는 proxy안에 readonly에 대한 요소가 있어서 변경이 안되었을 것이라도 추측함
        detailValue.value = toRaw(noticeDetail.value.detail);
        if (
            detailValue.value.fileExt === 'jpg' ||
            detailValue.value.fileExt === 'gif' ||
            detailValue.value.fileExt === 'png'
        ) {
            fileDownload('preview');
        }
    }
});

// v-model에 삼항연산자를 직접적으로 할당 할수 없기 때문에, computed를 사용해서 조건에 따라 값을 조정하려 함 -> 근데 tanstack query가 readonly라 set을 사용할 수 없음.
// const detailValue = computed({
//     get() {
//         return isSuccess.value && noticeDetail.value ? noticeDetail.value.detail : {};
//     },
//     set(newValue) {
//         if (isSuccess.value && noticeDetail.value) {
//             noticeDetail.value.detail = newValue;
//         }
//     },
// });

const apiSuccess = () => {
    alert('저장완료');
    router.go(-1);
    queryClient.invalidateQueries({
        queryKey: ['noticeList'],
    });
};

const handlerFile = (e) => {
    const fileInfo = e.target.files; // FileList {0: File, length: 1}
    const fileInfoSplit = fileInfo[0].name.split('.');
    const fileExtension = fileInfoSplit[1].toLowerCase();
    if (fileExtension === 'jpg' || fileExtension === 'gif' || fileExtension === 'png') {
        imageUrl.value = URL.createObjectURL(fileInfo[0]); // blob 형태로 이미지 url 생성
    } else {
        imageUrl.value = '';
    }
    fileData.value = fileInfo[0];
};
// const noticeDetailInsert = async () => {
//     const textData = {
//         ...detailValue.value,
//         loginId: userInfo.user.loginId,
//     };
//     const fileForm = new FormData();
//     fileData.value && fileForm.append('file', fileData.value);
//     fileForm.append(
//         'text',
//         new Blob([JSON.stringify(textData)], {
//             type: 'application/json',
//         })
//     );
//     await axios.post('/api/board/noticeFileSaveForm.do', fileForm);
// };

// const { mutate: noticeInsert } = useMutation({
//     mutationFn: noticeDetailInsert,
//     onSuccess: apiSuccess,
// });

const { mutate: noticeInsert } = useNoticeSaveMutation(detailValue, fileData, userInfo.user.loginId);

// const noticeDetailUpdate = async () => {
//     const textData = {
//         ...detailValue.value,
//         noticeSeq: params.idx,
//     };
//     const fileForm = new FormData();
//     fileData.value && fileForm.append('file', fileData.value);
//     fileForm.append(
//         'text',
//         new Blob([JSON.stringify(textData)], {
//             type: 'application/json',
//         })
//     );
//     await axios.post('/api/board/noticeFileUpdateForm.do', fileForm);
// };

// const { mutate: noticeUpdate } = useMutation({ mutationFn: noticeDetailUpdate, onSuccess: apiSuccess });

const { mutate: noticeUpdate } = useNoticeUpdateMutation(detailValue, fileData, params.idx);

// const noticeDetailDelete = async () => {
//     const textData = {
//         noticeSeq: params.idx,
//     };
//     await axios.post('/api/board/noticeDeleteBody.do', {
//         noticeSeq: params.idx,
//     });
// };

// const { mutate: noticeDelete } = useMutation({ mutationFn: noticeDetailDelete, onSuccess: apiSuccess });
const { mutate: noticeDelete } = useNoticeDeleteMutation(params.idx);
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

import axios from 'axios';

export const noticeListApi = async (injectedValue, cPage) => {
    const param = new URLSearchParams({
        currentPage: cPage,
        pageSize: 5,
        ...injectedValue,
    });
    const result = await axios.post('/api/board/noticeListJson.do', param);

    return result.data;
};

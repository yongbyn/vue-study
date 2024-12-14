import axios from 'axios';

export const noticeDetailApi = async (idx) => {
    const result = await axios.post('/api/board/noticeDetailBody.do', {
        noticeSeq: idx,
    });
    return result.data;
};

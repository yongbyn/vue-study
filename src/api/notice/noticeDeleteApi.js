import axios from 'axios';

export const noticeDeleteApi = async (idx) => {
    try {
        await axios.post('/api/board/noticeDeleteBody.do', { noticeSeq: idx });
    } catch (error) {
        console.log(error);
    }
};

import axios from 'axios';

export const noticeUpdateApi = async (text, file, idx) => {
    const textData = {
        ...text.value,
        noticeSeq: idx,
    };
    const fileForm = new FormData();
    file.value && fileForm.append('file', file.value);
    fileForm.append(
        'text',
        new Blob([JSON.stringify(textData)], {
            type: 'application/json',
        })
    );
    try {
        await axios.post('/api/board/noticeFileUpdateForm.do', fileForm);
    } catch (error) {
        console.log(error);
    }
};

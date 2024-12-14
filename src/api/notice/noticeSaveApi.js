import axios from 'axios';

export const noticeSaveApi = async (text, file, user) => {
    const textData = {
        ...text.value,
        loginId: user,
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
        await axios.post('/api/board/noticeFileSaveForm.do', fileForm);
    } catch (error) {
        console.log(error);
    }
};

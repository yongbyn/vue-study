import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';
import { noticeUpdateApi } from '../../api/notice/noticeUpdateApi';

export const useNoticeUpdateMutation = (text, file, idx) => {
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation({
        mutationFn: () => noticeUpdateApi(text, file, idx),
        mutationKey: ['noticeUpdate'],
        onSuccess: () => {
            router.go(-1);
            queryClient.invalidateQueries({
                queryKey: ['noticeList'],
            });
        },
    });
};

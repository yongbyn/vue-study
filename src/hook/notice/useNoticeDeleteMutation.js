import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';
import { noticeDeleteApi } from '../../api/notice/noticeDeleteApi';

export const useNoticeDeleteMutation = (idx) => {
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation({
        mutationFn: () => noticeDeleteApi(idx),
        mutationKey: ['noticeInsert'],
        onSuccess: () => {
            router.go(-1);
            queryClient.invalidateQueries({
                queryKey: ['noticeList'],
            });
        },
    });
};

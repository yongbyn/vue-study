import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { noticeSaveApi } from '../../api/notice/noticeSaveApi';
import { useRouter } from 'vue-router';

export const useNoticeSaveMutation = (text, file, user) => {
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation({
        mutationFn: () => noticeSaveApi(text, file, user),
        mutationKey: ['noticeInsert'],
        onSuccess: () => {
            router.go(-1);
            queryClient.invalidateQueries({
                queryKey: ['noticeList'],
            });
        },
    });
};

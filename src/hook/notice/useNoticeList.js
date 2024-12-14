import { useQuery } from '@tanstack/vue-query';
import { noticeListApi } from '../../api/notice/noticeListApi';

export const useNoticeList = (injectedValue, cPage) => {
    return useQuery({
        queryKey: ['noticeList', injectedValue, cPage],
        queryFn: () => noticeListApi(injectedValue.value, cPage.value),
        staleTime: 1000 * 60,
    });
};

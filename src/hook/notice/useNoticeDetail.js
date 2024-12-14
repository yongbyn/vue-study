import { useQuery } from '@tanstack/vue-query';
import { noticeDetailApi } from '../../api/notice/noticeDetailApi';

export const useNoticeDetail = (idx) => {
    // idx가 변경 될 때마다 refetch
    // staleTime으로 해당 데이터가 신선한 상태인지 알려줌
    // !!idx은 idx가 그 자체로 값이기 때문에, 확실한 true나 false 값으로 정해서 사용하기 위한 것, 유효성을 명확하게 검사
    return useQuery({
        queryKey: ['detailList', idx],
        queryFn: () => noticeDetailApi(idx),
        staleTime: 1000 * 60,
        enabled: !!idx,
    });
};

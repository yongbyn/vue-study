import { useRouter } from "vue-router";
import { noticeDetailDeleteApi } from "../../api/notice/noticeDetailDeleteApi";
import { useMutation, useQueryClient } from "@tanstack/vue-query";

export const useNoticeDetailDeleteMutation = (params) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["noticeDelete"],
    mutationFn: () => noticeDetailDeleteApi(params.idx),
    onSuccess: () => {
      router.go(-1);
      queryClient.invalidateQueries({
        queryKey: ["noticeList"],
      });
    },
  });
};

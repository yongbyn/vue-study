import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { noticeDetailInsertApi } from "../../api/notice/noticeDetailInsertApi";

export const useNoticeDetailInsertMutation = (detailValue, loginId) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["noticeInsert"],
    mutationFn: () => noticeDetailInsertApi(detailValue.value, loginId),
    onSuccess: () => {
      router.go(-1);
      queryClient.invalidateQueries({
        queryKey: ["noticeList"],
      });
    },
  });
};

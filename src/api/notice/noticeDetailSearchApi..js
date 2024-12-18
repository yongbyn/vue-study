import axios from "axios";
import { Notice } from "../api";

export const noticeDetailSearchApi = async (params) => {
  const result = await axios.post(Notice.SearchNoticeDetail, {
    noticeSeq: params.idx,
  });
  return result.data;
};

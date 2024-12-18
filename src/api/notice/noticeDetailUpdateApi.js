import axios from "axios";
import { Notice } from "../api";

export const noticeDetailUpdateApi = async (detailValue, idx) => {
  const textData = {
    ...detailValue,
    noticeSeq: idx,
    context: detailValue.content,
  };

  await axios.post(Notice.UpdateNoticeDetail, textData);
};

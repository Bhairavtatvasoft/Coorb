import { apiRequest } from "../interceptor";
import { IDownloadFile } from "./Filemodel";

class FileService {
  upload = async (payload: IDownloadFile) => {
    return await apiRequest.get(`task/file/download`, payload);
  };

  download = async (payload: IDownloadFile) => {
    return await apiRequest.get(`task/file/download`, payload);
  };
}

export const fileService = new FileService();

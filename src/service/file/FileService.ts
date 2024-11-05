import { apiRequest } from "../interceptor";
import { IUploadFile, IDownloadFile } from "./FileModel";

class FileService {
  upload = async (payload: IUploadFile, byteArr: Uint8Array) => {
    let url = `task/file/upload`;
    Object.keys(payload).forEach((key, i) => {
      url +=
        i === 0 ? "?" : "&" + `${key}=${payload[key as keyof IUploadFile]}`;
    });
    return await apiRequest.post(url, byteArr);
  };

  download = async (payload: IDownloadFile) => {
    return await apiRequest.get(`task/file/download`, payload);
  };
}

export const fileService = new FileService();

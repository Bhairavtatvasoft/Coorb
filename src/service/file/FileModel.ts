export interface IDownloadFile {
  taskInstanceId: string;
  taskInstanceTokenId: string;
  variableTypeId: number;
  variableTypeTokenId: string;
}

export interface IUploadFile {
  fileName: string;
  flowInstanceId: number;
  flowInstanceTokenId: number;
  taskInstanceId: number;
  taskInstanceTokenId: number;
  variableTypeId: number;
  variableTypeTokenId: number;
}

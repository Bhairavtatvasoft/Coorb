import { AxiosResponse } from "axios";
import { apiRequest } from "../interceptor";
import { ILoadRes } from "./TaskModel";

class TaskService {
  load = async (
    taskInstanceId: string,
    tokenId: string
  ): Promise<AxiosResponse<ILoadRes>> => {
    return apiRequest.post(`task/load`, {
      taskInstanceId,
      tokenId,
    });
  };

  release = async (taskInstanceId: string, tokenId: number) => {
    return apiRequest.post(`task/release`, {
      taskInstanceId,
      tokenId,
    });
  };

  save = async (taskInstanceId: string, tokenId: number) => {
    return apiRequest.post(`task/save`, {
      taskInstanceId,
      tokenId,
    });
  };

  commit = async (taskInstanceId: string, tokenId: number) => {
    return apiRequest.post(`task/commit`, {
      taskInstanceId,
      tokenId,
    });
  };
}

export const taskService = new TaskService();

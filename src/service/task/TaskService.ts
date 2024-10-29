import { apiRequest } from "../interceptor";

class TaskService {
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

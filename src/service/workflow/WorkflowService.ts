import { apiRequest } from "../interceptor";

class WorkflowService {
  getAll = async () => {
    return await apiRequest.get(`getAll`);
  };

  release = async (taskInstanceId: string, tokenId: number) => {
    return apiRequest.post(`/api/v1/task/release`, {
      taskInstanceId,
      tokenId,
    });
  };

  startWorkflow=async (id: string, tokenId: number) => {
    return apiRequest.post(`/api/v1/workflow/start/${id}`, {
      tokenId,
    });
  };
}

export const workflowService = new WorkflowService();

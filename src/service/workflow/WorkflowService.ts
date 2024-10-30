import { apiRequest } from "../interceptor";

class WorkflowService {
  getStartableWorkflows = async () => {
    return await apiRequest.get(`api/v1/workflow/startable`);
  };

  getpendingWorkflows = async () => {
    return await apiRequest.get(`api/v1/tasks/pending`);
  }

  releaseTask = async (taskInstanceId: string, tokenId: number) => {
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

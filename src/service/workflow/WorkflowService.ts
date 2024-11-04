import { apiRequest } from "../interceptor";

class WorkflowService {
  getStartableWorkflows = async () => {
    return await apiRequest.get(`workflow/startable`);
  };

  getpendingWorkflows = async () => {
    return await apiRequest.get(`tasks/pending`);
  };

  releaseTask = async (taskInstanceId: string, tokenId: number) => {
    return apiRequest.post(`task/release`, {
      taskInstanceId,
      tokenId,
    });
  };

  instantiate = async (
    workflowTypeToken: string,
    workflowTypeTokenId: string
  ) => {
    return apiRequest.post(`workflow/instantiate`, {
      workflowTypeToken,
      workflowTypeTokenId,
    });
  };

  startWorkflow = async (id: string, tokenId: number) => {
    return apiRequest.post(`workflow/start/${id}`, {
      tokenId,
    });
  };
}

export const workflowService = new WorkflowService();

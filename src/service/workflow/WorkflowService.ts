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

  instantiate = async (workflowTypeToken:string,workflowTypeTokenId:number) =>{
    return apiRequest.post(`/api/v1/workflow/instantiate`,{
      workflowTypeToken,
      workflowTypeTokenId
    })
  }

  startWorkflow=async (id: string, tokenId: number) => {
    return apiRequest.post(`/api/v1/workflow/start/${id}`, {
      tokenId,
    });
  };
}

export const workflowService = new WorkflowService();

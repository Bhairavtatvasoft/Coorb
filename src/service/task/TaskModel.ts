import {
  SelectedTaskStatus,
  Status,
  Variable,
} from "../workflow/WorkflowModel";

export interface IDownloadFile {
  taskInstanceId: string;
  taskInstanceTokenId: string;
  variableTypeId: string;
  variableTypeTokenId: string;
}

export interface ILoadRes {
  taskInstanceId: string;
  workflowInstanceId: string;
  addedOn: string;
  addedBy: string;
  savedOn: string;
  savedBy: string;
  committedOn: string;
  committedBy: string;
  statusInId: string;
  statusOutId: string;
  tenantId: string;
  nextTenantId: string;
  nextTaskTypeId: string;
  taskTypeId: string;
  data: number[];
  note: string;
  selectedTaskStatus: SelectedTaskStatus;
  businessErrorMessage: string;
  statuses: { [key: string]: Status };
  variables: { [key: string]: Variable };
  variablesByName: { [key: string]: string };
}

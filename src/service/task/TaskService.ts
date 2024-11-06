import { AxiosResponse } from "axios";
import { apiRequest } from "../interceptor";
import { ITaskDetail } from "./TaskModel";

class TaskService {
  load = async (
    taskInstanceId: string,
    tokenId: string
  ): Promise<AxiosResponse<ITaskDetail>> => {
    return Promise.resolve({
      status: 200,
      data: {
        taskInstanceId: "3346842635397186252",
        workflowInstanceId: "3969728357447641822",
        addedOn: "2024-11-04T08:11:16.503+00:00",
        addedBy: "2854756403892908761",
        savedOn: null,
        savedBy: "0",
        committedOn: null,
        committedBy: "0",
        statusInId: "-1981012184598781674",
        statusOutId: "0",
        tenantId: "-4279913953786928077",
        nextTenantId: "0",
        nextTaskTypeId: "0",
        taskTypeId: "-5802587260278582913",
        data: [
          457, 0, 0, 0, 454, 451, 0, 453, 456, 455, 0, 452, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
        note: null,
        renderingStyle: "Wizard",
        selectedTaskStatus: {
          id: "0",
          i18nName: "",
          startingTask: false,
          endingTask: false,
        },
        businessErrorMessage: null,
        statuses: {
          "1": {
            id: "-2037231870496490645",
            i18nName: "Submit",
            startingTask: true,
            endingTask: true,
          },
        },
        variables: {
          "11": {
            id: "11",
            tokenId: 0,
            i18nName: "Educational Expenses",
            type: 7,
            comboListName: null,
            required: 1,
            hidden: 0,
            readOnly: 0,
            i18nGroupName: "Reponsible Lending",
            mimeType: null,
            jdbcType: 3,
            auditable: 1,
            exitClassId: "0",
            exitClassDataId: "0",
            instanceId: "277",
            textValue: null,
            numericValue: "0",
          },
          "12": {
            id: "12",
            tokenId: 0,
            i18nName: "Other Loans",
            type: 7,
            comboListName: null,
            required: 1,
            hidden: 0,
            readOnly: 0,
            i18nGroupName: "Reponsible Lending",
            mimeType: null,
            jdbcType: 3,
            auditable: 1,
            exitClassId: "0",
            exitClassDataId: "0",
            instanceId: "278",
            textValue: null,
            numericValue: "0",
          },
          "13": {
            id: "13",
            tokenId: 0,
            i18nName: "Commodity Type",
            type: 2,
            comboListName: "Commodities",
            required: 1,
            hidden: 0,
            readOnly: 0,
            i18nGroupName: "Commidity Trading",
            mimeType: null,
            jdbcType: 4,
            auditable: 1,
            exitClassId: "0",
            exitClassDataId: "0",
            instanceId: "279",
            textValue: null,
            numericValue: "0",
          },
          "14": {
            id: "14",
            tokenId: 0,
            i18nName: "Commodity Quantity",
            type: 7,
            comboListName: null,
            required: 1,
            hidden: 0,
            readOnly: 0,
            i18nGroupName: "Commidity Trading",
            mimeType: null,
            jdbcType: 3,
            auditable: 1,
            exitClassId: "0",
            exitClassDataId: "0",
            instanceId: "280",
            textValue: null,
            numericValue: "0",
          },
          "15": {
            id: "15",
            tokenId: 0,
            i18nName: "Cost of Purchase",
            type: 7,
            comboListName: null,
            required: 1,
            hidden: 0,
            readOnly: 0,
            i18nGroupName: "Commidity Trading",
            mimeType: null,
            jdbcType: 3,
            auditable: 1,
            exitClassId: "0",
            exitClassDataId: "0",
            instanceId: "281",
            textValue: null,
            numericValue: "0",
          },
          "16": {
            id: "16",
            tokenId: 0,
            i18nName: "Trader Name",
            type: 1,
            comboListName: null,
            required: 1,
            hidden: 0,
            readOnly: 0,
            i18nGroupName: "Commidity Trading",
            mimeType: null,
            jdbcType: 12,
            auditable: 1,
            exitClassId: "0",
            exitClassDataId: "0",
            instanceId: "282",
            textValue: null,
            numericValue: "0",
          },
          "17": {
            id: "17",
            tokenId: 0,
            i18nName: "Have Commodity Delivered?",
            type: 8,
            comboListName: null,
            required: 1,
            hidden: 0,
            readOnly: 0,
            i18nGroupName: "Commidity Trading",
            mimeType: null,
            jdbcType: -7,
            auditable: 1,
            exitClassId: "8221013348248595487",
            exitClassDataId: "459",
            instanceId: "283",
            textValue: null,
            numericValue: "0",
          },
          "18": {
            id: "18",
            tokenId: 0,
            i18nName: "Allow the Bank to Purchase on Behalf?",
            type: 8,
            comboListName: null,
            required: 1,
            hidden: 0,
            readOnly: 0,
            i18nGroupName: "Commidity Trading",
            mimeType: null,
            jdbcType: -7,
            auditable: 1,
            exitClassId: "5717706249840725251",
            exitClassDataId: "460",
            instanceId: "284",
            textValue: null,
            numericValue: "0",
          },
          "19": {
            id: "19",
            tokenId: 0,
            i18nName: "Allow the Bank to Sell on Behalf?",
            type: 8,
            comboListName: null,
            required: 1,
            hidden: 0,
            readOnly: 0,
            i18nGroupName: "Commidity Trading",
            mimeType: null,
            jdbcType: -7,
            auditable: 1,
            exitClassId: "1254701699855429693",
            exitClassDataId: "461",
            instanceId: "285",
            textValue: null,
            numericValue: "0",
          },
          "1": {
            id: "1",
            tokenId: 0,
            i18nName: "Mobile Number",
            type: 1,
            comboListName: null,
            required: 1,
            hidden: 0,
            readOnly: 0,
            i18nGroupName: "Identification",
            mimeType: null,
            jdbcType: 12,
            auditable: 1,
            exitClassId: "0",
            exitClassDataId: "0",
            instanceId: "267",
            textValue: null,
            numericValue: "0",
          },
          "2": {
            id: "2",
            tokenId: 0,
            i18nName: "National ID",
            type: 1,
            comboListName: null,
            required: 1,
            hidden: 0,
            readOnly: 0,
            i18nGroupName: "Identification",
            mimeType: null,
            jdbcType: 12,
            auditable: 1,
            exitClassId: "0",
            exitClassDataId: "0",
            instanceId: "268",
            textValue: null,
            numericValue: "0",
          },
          "3": {
            id: "3",
            tokenId: 0,
            i18nName: "Date of Birth",
            type: 3,
            comboListName: null,
            required: 1,
            hidden: 0,
            readOnly: 0,
            i18nGroupName: "Identification",
            mimeType: null,
            jdbcType: 91,
            auditable: 1,
            exitClassId: "0",
            exitClassDataId: "0",
            instanceId: "269",
            textValue: null,
            numericValue: "0",
          },
          "4": {
            id: "2199180219157442381",
            tokenId: 458,
            i18nName: "Contract",
            type: 6,
            comboListName: null,
            required: 1,
            hidden: 0,
            readOnly: 0,
            i18nGroupName: "Final Decision",
            mimeType: "application/x-pdf",
            jdbcType: -2,
            auditable: 1,
            exitClassId: "0",
            exitClassDataId: "0",
            instanceId: "270",
            textValue: null,
            numericValue: "0",
          },
          "5": {
            id: "5",
            tokenId: 0,
            i18nName: "Loan Amount",
            type: 7,
            comboListName: null,
            required: 1,
            hidden: 0,
            readOnly: 0,
            i18nGroupName: "Final Decision",
            mimeType: null,
            jdbcType: 3,
            auditable: 1,
            exitClassId: "0",
            exitClassDataId: "0",
            instanceId: "271",
            textValue: null,
            numericValue: "0",
          },
          "6": {
            id: "6",
            tokenId: 0,
            i18nName: "Loan Period",
            type: 2,
            comboListName: null,
            required: 1,
            hidden: 0,
            readOnly: 0,
            i18nGroupName: "Final Decision",
            mimeType: null,
            jdbcType: 4,
            auditable: 1,
            exitClassId: "0",
            exitClassDataId: "0",
            instanceId: "272",
            textValue: null,
            numericValue: "0",
          },
          "7": {
            id: "7",
            tokenId: 0,
            i18nName: "EMI",
            type: 7,
            comboListName: null,
            required: 1,
            hidden: 0,
            readOnly: 0,
            i18nGroupName: "Final Decision",
            mimeType: null,
            jdbcType: 3,
            auditable: 1,
            exitClassId: "0",
            exitClassDataId: "0",
            instanceId: "273",
            textValue: null,
            numericValue: "0",
          },
          "8": {
            id: "8",
            tokenId: 0,
            i18nName: "APR",
            type: 7,
            comboListName: null,
            required: 1,
            hidden: 0,
            readOnly: 0,
            i18nGroupName: "Final Decision",
            mimeType: null,
            jdbcType: 3,
            auditable: 1,
            exitClassId: "0",
            exitClassDataId: "0",
            instanceId: "274",
            textValue: null,
            numericValue: "0",
          },
          "9": {
            id: "9",
            tokenId: 0,
            i18nName: "Family Expenses",
            type: 7,
            comboListName: null,
            required: 1,
            hidden: 0,
            readOnly: 0,
            i18nGroupName: "Reponsible Lending",
            mimeType: null,
            jdbcType: 3,
            auditable: 1,
            exitClassId: "0",
            exitClassDataId: "0",
            instanceId: "275",
            textValue: null,
            numericValue: "0",
          },
          "10": {
            id: "10",
            tokenId: 0,
            i18nName: "Medical Expenses",
            type: 7,
            comboListName: null,
            required: 1,
            hidden: 0,
            readOnly: 0,
            i18nGroupName: "Reponsible Lending",
            mimeType: null,
            jdbcType: 3,
            auditable: 1,
            exitClassId: "0",
            exitClassDataId: "0",
            instanceId: "276",
            textValue: null,
            numericValue: "0",
          },
        },
        variablesByName: {
          "Allow the Bank to Sell on Behalf?": "19",
          EMI: "7",
          APR: "8",
          "Allow the Bank to Purchase on Behalf?": "18",
          "Commodity Quantity": "14",
          "Commodity Type": "13",
          "Loan Period": "6",
          "Educational Expenses": "11",
          "Other Loans": "12",
          "Mobile Number": "1",
          "Cost of Purchase": "15",
          "Trader Name": "16",
          "National ID": "2",
          "Have Commodity Delivered?": "17",
          "Date of Birth": "3",
          "Family Expenses": "9",
          "Loan Amount": "5",
          Contract: "2199180219157442381",
          "Medical Expenses": "10",
        },
      },
    });
    // return apiRequest.post(`task/load`, {
    //   taskInstanceId,
    //   tokenId,
    // });
  };

  release = async (taskInstanceId: string, tokenId: string) => {
    return apiRequest.post(`task/release`, {
      taskInstanceId,
      tokenId,
    });
  };

  save = async (payload: ITaskDetail) => {
    return apiRequest.post(`task/save`, payload);
  };

  commit = async (payload: ITaskDetail) => {
    return apiRequest.post(`task/commit`, payload);
  };

  buttonClick = async (payload: {
    task: ITaskDetail;
    buttonVarialeId: string;
  }) => {
    return apiRequest.post(`task/click`, {
      payload,
    });
  };
}

export const taskService = new TaskService();

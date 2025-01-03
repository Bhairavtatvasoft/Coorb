import * as yup from "yup";

export const SAMPLE_TASK = {
  taskInstanceId: "-4831456008543835188",
  workflowInstanceId: "4487473015890814746",
  addedOn: 1726989974134,
  addedBy: "-2058666430192873376",
  savedOn: 0,
  savedBy: "0",
  committedOn: 0,
  committedBy: "0",
  statusInId: "3015348466658260267",
  statusOutId: "0",
  tenantId: "1664928220326095916",
  nextTenantId: "0",
  nextTaskTypeId: "0",
  taskTypeId: "2133146447077756039",
  data: [
    27885, 0, 0, 0, 27881, 27877, 0, 27879, 27884, 27882, 0, 27878, 27880,
    27883, 0, 0, 0, 0, 0, 0,
  ],
  note: "Please note the following...",
  selectedTaskStatus: {
    id: "0",
    i18nName: "",
    startingTask: false,
    endingTask: false,
  },
  businessErrorMessage: "",
  statuses: new Map([
    [
      "1",
      {
        id: "-2753605844256506471",
        i18nName: "STARTED",
        startingTask: true,
        endingTask: true,
      },
    ],
    [
      "2",
      {
        id: "-2151848403503248473",
        i18nName: "SEND FOR REVIEW",
        startingTask: false,
        endingTask: false,
      },
    ],
    [
      "3",
      {
        id: "-2408185604655529209",
        i18nName: "DROPPED",
        startingTask: false,
        endingTask: false,
      },
    ],
  ]),
  variables: new Map([
    [
      "1",
      {
        id: "1",
        tokenId: "0",
        i18nName: "FIRST",
        type: 1,
        comboListName: "",
        required: 1,
        hidden: 0,
        readOnly: 0,
        i18nGroupName: "INFO",
        mimeType: "",
        jdbcType: 12,
        auditable: 0,
        exitClassId: "0",
        exitClassDataId: "0",
        instanceId: "1081",
        textValue: "First",
        numericValue: "0",
      },
    ],
    [
      "2",
      {
        id: "2",
        tokenId: "0",
        i18nName: "MIDDLE",
        type: 1,
        comboListName: "",
        required: 0,
        hidden: 0,
        readOnly: 0,
        i18nGroupName: "INFO",
        mimeType: "",
        jdbcType: 12,
        auditable: 0,
        exitClassId: "0",
        exitClassDataId: "0",
        instanceId: "1082",
        textValue: "Middle",
        numericValue: "0",
      },
    ],
    [
      "3",
      {
        id: "3",
        tokenId: "0",
        i18nName: "LAST",
        type: 1,
        comboListName: "",
        required: 1,
        hidden: 0,
        readOnly: 0,
        i18nGroupName: "INFO",
        mimeType: "",
        jdbcType: 12,
        auditable: 0,
        exitClassId: "0",
        exitClassDataId: "0",
        instanceId: "1083",
        textValue: "Last",
        numericValue: "0",
      },
    ],
    [
      "4",
      {
        id: "4",
        tokenId: "0",
        i18nName: "CURRENCY",
        type: 2,
        comboListName: "Currencies",
        required: 0,
        hidden: 0,
        readOnly: 0,
        i18nGroupName: "INFO",
        mimeType: "",
        jdbcType: 4,
        auditable: 0,
        exitClassId: "0",
        exitClassDataId: "0",
        instanceId: "1084",
        textValue: "840",
        numericValue: "0",
      },
    ],
    [
      "5",
      {
        id: "5",
        tokenId: "0",
        i18nName: "GET DATA FROM DB",
        type: 8,
        comboListName: "",
        required: 0,
        hidden: 0,
        readOnly: 0,
        i18nGroupName: "INFO",
        mimeType: "",
        jdbcType: -7,
        auditable: 0,
        exitClassId: "746762057971711761",
        exitClassDataId: "27886",
        instanceId: "1085",
        textValue: "",
        numericValue: "0",
      },
    ],
    [
      "6",
      {
        id: "-7517195796505642011",
        tokenId: "27887",
        i18nName: "APPLICATION DOCUMENT",
        type: 6,
        comboListName: "",
        required: 0,
        hidden: 0,
        readOnly: 0,
        i18nGroupName: "ATTACHMENTS",
        mimeType: "",
        jdbcType: -2,
        auditable: 0,
        exitClassId: "0",
        exitClassDataId: "0",
        instanceId: "1086",
        textValue: "",
        numericValue: "0",
      },
    ],
  ]),

  variablesByName: new Map([
    [
      "CURRENCY",
      {
        variableNameId: "4",
      },
    ],
    [
      "CURRENCY",
      {
        variableNameId: "4",
      },
    ],
    [
      "APPLICATION DOCUMENT",
      {
        variableNameId: "-7517195796505642011",
      },
    ],
    [
      "LAST",
      {
        variableNameId: "3",
      },
    ],
    [
      "FIRST",
      {
        variableNameId: "1",
      },
    ],
    [
      "MIDDLE",
      {
        variableNameId: "2",
      },
    ],
  ]),
};

export { yup };

export const JDBC_TYPE = {
  Button: -7,
  UploadDocument: -2,
  DecimalInput: 3,
  IntegerInput: 4,
  TextInput: 12,
  TextAreaInput: 2005,
  Checkbox: 16,
  URL: 70,
  DatePicker: 91,
  TimePicker: 92,
  Label: 93,
  Password: 2012,
};

export const FORM_TYPE = {
  TAB: "Tab",
  WIZARD: "Wizard",
};

export const CONST_WORDS = {
  sessionTaskDetail: "CME_TASK_DETAIL",
  token: "CME_TOKEN",
  username: "CME_USERNAME",
};

export const ALLOWED_FILE_EXTENSION = ["pdf", "jpg", "png", "jpeg", "gif"];

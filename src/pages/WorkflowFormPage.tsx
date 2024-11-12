import { Formik, FormikErrors, FormikProps, FormikTouched } from "formik";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { IObject, ISelectOpt } from "../service/commonModel";
import { CONST_WORDS, FORM_TYPE, JDBC_TYPE, yup } from "../utils/constant";
import { Button, Grid2, Paper } from "@mui/material";
import { ObjectSchema } from "yup";
import { useTranslation } from "react-i18next";
import "./Workflow.scss";
import SelectField from "../components/common/SelectField";
import NoteModal from "../components/workflow/NoteModal";
import "./WorkflowFormPage.scss";
import WizardComponent from "../components/workflow/WizardForm";
import TabsComponent from "../components/workflow/TabForm";
import { taskService } from "../service/task/TaskService";
import { Variable } from "../service/workflow/WorkflowModel";
import { useParams } from "react-router";
import { ITaskDetail } from "../service/task/TaskModel";
import { errorToast, successToast } from "../components/common/ToastMsg";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { TFunction } from "i18next";

// eslint-disable-next-line react-refresh/only-export-components
export const transferObjectForTaskSave = (
  data: IObject,
  t: TFunction<"translation", undefined>
) => {
  const newData: ITaskDetail & { taskInstanceTokenId?: string } = JSON.parse(
    JSON.stringify(data)
  );

  Object.values(newData.variables).forEach((variable: Variable, i: number) => {
    if (t(variable.i18nName) === t(variable.i18nName)) {
      const formFieldVal = data.formField[t(variable.i18nName)];
      if (variable.jdbcType === JDBC_TYPE.Checkbox) {
        newData.variables[i + 1].numericValue = formFieldVal;
      } else if (variable.jdbcType === JDBC_TYPE.DatePicker) {
        newData.variables[i + 1].textValue =
          moment(formFieldVal).format("DD/MM/YYYY");
      } else if (variable.jdbcType === JDBC_TYPE.TimePicker) {
        newData.variables[i + 1].textValue =
          moment(formFieldVal).format("HH:mm");
      } else if (
        variable.jdbcType === JDBC_TYPE.IntegerInput &&
        variable.comboListName &&
        formFieldVal
      ) {
        newData.variables[i + 1].textValue = formFieldVal.label;
        newData.variables[i + 1].numericValue = formFieldVal.value;
      } else if (variable.jdbcType !== JDBC_TYPE.UploadDocument) {
        newData.variables[i + 1].textValue = formFieldVal;
      }
    }
  });

  //removing extra fields before passing data to backend
  newData.formField = undefined;
  newData.taskInstanceTokenId = undefined;
  newData.selectedTaskStatus.value = undefined;
  newData.selectedTaskStatus.label = undefined;

  return newData;
};
import i18n from "../translation/i18n";

const WorkflowFormPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { taskInstanceId, taskInstanceTokenId } = useParams();

  const taskSessionKey =
    taskInstanceId +
    "_" +
    taskInstanceTokenId +
    "_" +
    CONST_WORDS.sessionTaskDetail;

  const formRef = useRef<FormikProps<IObject>>(null);

  const [showNoteModal, setShowNoteModal] = useState<boolean>(false);
  const [validationSchema, setValidationSchema] =
    useState<ObjectSchema<IObject> | null>(yup.object().shape({}));
  const [initValues, setInitialValues] = useState<IObject>({
    formField: {},
  });
  const [groupedVariables, setGroupedVariables] = useState<IObject>({});
  const [commitStatus, setCommitStatus] = useState<ISelectOpt[]>([]);

  const requestInitiated = useRef(false);

  useLayoutEffect(() => {
    if (taskInstanceId && taskInstanceTokenId) {
      getTaskDetail(taskInstanceId, taskInstanceTokenId);
    }
  }, []);

  useEffect(() => {
    if (i18n.language && initValues.variables) {
      const newValidationSchema: Record<string, any> = {};
      Object.values((initValues as ITaskDetail).variables).forEach(
        (variable) => {
          if (
            ![JDBC_TYPE.Button, JDBC_TYPE.Label, JDBC_TYPE.URL].includes(
              variable.jdbcType
            )
          ) {
            if (variable.required && !variable.hidden) {
              newValidationSchema[variable.i18nName] = yup
                .mixed()
                .required(t(variable.i18nName) + " " + t("isRequired"));
            }
          }
        }
      );
      setValidationSchema(
        yup.object().shape({
          formField: yup.object().shape(newValidationSchema),
        })
      );

      setCommitStatus(
        Object.keys(initValues.statuses).map((x) => ({
          ...initValues.statuses[x],
          value: initValues.statuses[x].id,
          label: t(initValues.statuses[x].i18nName),
        }))
      );

      setTimeout(() => {
        formRef.current?.validateForm();
      }, 0);
    }
  }, [i18n.language]);

  const getTaskDetail = (
    taskInstanceId: string,
    taskInstanceTokenId: string
  ) => {
    const existingTaskDetail = localStorage.getItem(taskSessionKey);
    if (existingTaskDetail) {
      setupInitialValues(JSON.parse(existingTaskDetail) as ITaskDetail);
    } else if (!requestInitiated.current) {
      requestInitiated.current = true;
      taskService.load(taskInstanceId, taskInstanceTokenId).then((res) => {
        if (res?.data) {
          setupInitialValues(res.data, true);
        }
      });
    }
  };

  const setupInitialValues = (data: ITaskDetail, isUpdateStorage?: boolean) => {
    if (isUpdateStorage)
      localStorage.setItem(taskSessionKey, JSON.stringify(data));

    const newInitVal: Record<string, any> = {};
    const newValidationSchema: Record<string, any> = {};
    Object.values(data.variables).forEach((variable) => {
      if (
        ![JDBC_TYPE.Button, JDBC_TYPE.Label, JDBC_TYPE.URL].includes(
          variable.jdbcType
        )
      ) {
        if (variable.required && !variable.hidden) {
          newValidationSchema[variable.i18nName] = yup
            .mixed()
            .required(t(variable.i18nName) + " " + t("isRequired"));
        }
      }

      if (variable.jdbcType === JDBC_TYPE.Checkbox) {
        newInitVal[variable.i18nName] =
          variable.numericValue?.toString() === "1" ? true : false;
      } else if (
        variable.jdbcType === JDBC_TYPE.IntegerInput &&
        variable.comboListName &&
        variable.textValue &&
        variable.numericValue
      ) {
        newInitVal[variable.i18nName] = {
          value: variable.numericValue,
          label: variable.textValue,
        };
      } else {
        newInitVal[variable.i18nName] = variable.textValue;
      }
    });

    const newGrpVariables = Object.values(data.variables).reduce(
      (acc: Record<string, Variable[]>, variable: Variable) => {
        const group = variable.i18nGroupName;
        acc[group] = acc[group] || [];
        acc[group].push(variable);
        return acc;
      },
      {}
    );
    setGroupedVariables(newGrpVariables);

    setValidationSchema(
      yup.object().shape({
        formField: yup.object().shape(newValidationSchema),
      })
    );
    const newInitialValues = {
      ...data,
      formField: newInitVal,
      taskInstanceTokenId: data.data[5],
    };

    const statuses = data.statuses;
    if (statuses) {
      setCommitStatus(
        Object.keys(statuses).map((x) => ({
          ...statuses[x],
          value: statuses[x].id,
          label: t(statuses[x].i18nName),
        }))
      );
    }

    if (data.selectedTaskStatus.i18nName) {
      newInitialValues["selectedTaskStatus"] = {
        ...data.selectedTaskStatus,
        value: data.selectedTaskStatus.id,
        label: t(data.selectedTaskStatus.i18nName),
      };
    } else if (Object.keys(statuses)?.length === 1) {
      const val = Object.values(statuses)[0];
      newInitialValues["selectedTaskStatus"] = {
        ...val,
        value: val.id,
        label: t(val.i18nName),
      };
    }

    setInitialValues(newInitialValues);
  };

  const handleCancel = () => {
    taskService.release(taskInstanceId!, taskInstanceTokenId!).then((res) => {
      if (res) {
        navigate("/", { state: { tab: 1 } });
        localStorage.removeItem(taskSessionKey);
      }
    });
  };

  const handleCommitTask = (values: IObject) => {
    const payload = transferObjectForTaskSave(values, t);
    transferObjectForTaskSave(values, t);
    taskService.commit(payload).then((res) => {
      if (res) {
        successToast(t("commitSave"));
        localStorage.removeItem(taskSessionKey);
        navigate("/", { state: { tab: 1 } });
      }
    });
  };

  const handleSaveTask = (values: IObject) => {
    const payload = transferObjectForTaskSave(values, t);
    transferObjectForTaskSave(values, t);
    taskService.save(payload).then((res) => {
      if (res) {
        localStorage.removeItem(taskSessionKey);
        successToast(t("successSave"));
        navigate("/", { state: { tab: 1 } });
      }
    });
  };

  const isFormValid = (
    values: IObject,
    validateForm: (values?: any) => Promise<FormikErrors<IObject>>,
    setTouched: (
      touched: FormikTouched<IObject>,
      shouldValidate?: boolean
    ) => Promise<void | FormikErrors<IObject>>,
    callBack: any
  ) => {
    return validateForm(values).then((errors: IObject) => {
      if (errors?.formField) {
        const touchedFields: IObject = { formField: {} };
        Object.keys(errors.formField).forEach((field) => {
          touchedFields.formField[field] = true;
        });
        setTouched(touchedFields);
        errorToast(t("commonValidationMsg"));
      } else {
        callBack();
      }
    });
  };
  return (
    <Grid2 className="workflowFormWrapper">
      <Formik
        initialValues={initValues}
        validationSchema={validationSchema}
        onSubmit={() => {}}
        enableReinitialize
        innerRef={formRef}
      >
        {({ values, setFieldValue, validateForm, setTouched }) => {
          return (
            <form className="workflowDetailWrapper">
              <Paper className="workflowForm">
                <Grid2
                  size={{ xs: 12, sm: 12, md: 12, lg: 12 }}
                  key={`form-field-${1}`}
                >
                  {initValues.renderingStyle === FORM_TYPE.TAB ? (
                    <TabsComponent
                      groupedVariables={groupedVariables}
                      handleBtnClick={(data) => setupInitialValues(data, true)}
                    />
                  ) : (
                    <WizardComponent
                      groupedVariables={groupedVariables}
                      handleBtnClick={(data) => setupInitialValues(data, true)}
                    />
                  )}
                </Grid2>
              </Paper>

              <Paper
                className={`${
                  i18n.dir() === "rtl"
                    ? "workflowBtnWrapperRtl"
                    : "workflowBtnWrapper"
                }`}
              >
                <Grid2 container spacing={1} className="addNoteBtnWrapper">
                  <Grid2 size={{ xs: 12, md: 3.5 }}>
                    <Button
                      className="actionBtn addNoteBtn"
                      variant="contained"
                      color="primary"
                      onClick={() => setShowNoteModal(true)}
                    >
                      {t("addViewNote")}
                    </Button>
                  </Grid2>
                </Grid2>
                <Grid2 container spacing={2}>
                  <Grid2 size={{ xs: 6, md: 3 }}>
                    <Button
                      variant="contained"
                      type="button"
                      className="actionBtn"
                      onClick={() => {
                        isFormValid(values, validateForm, setTouched, () =>
                          handleSaveTask(values)
                        );
                      }}
                    >
                      {t("save")}
                    </Button>
                  </Grid2>
                  <Grid2 size={{ xs: 6, md: 3 }}>
                    <Button
                      variant="contained"
                      type="button"
                      className="actionBtn"
                      onClick={handleCancel}
                    >
                      {t("cancel")}
                    </Button>
                  </Grid2>
                  <Grid2 size={{ xs: 6, md: 3 }}>
                    <Button
                      variant="contained"
                      type="button"
                      className="actionBtn"
                      onClick={() => {
                        isFormValid(values, validateForm, setTouched, () =>
                          handleCommitTask(values)
                        );
                      }}
                    >
                      {t("commit")}
                    </Button>
                  </Grid2>
                  <Grid2 size={{ xs: 6, md: 3 }}>
                    <SelectField
                      options={commitStatus}
                      name={"selectedTaskStatus"}
                      lbl={"status"}
                      hideHelp
                      readOnly={commitStatus?.length === 1 ? 1 : 0}
                      hideClr
                    />
                  </Grid2>
                </Grid2>
              </Paper>
              {showNoteModal && (
                <NoteModal
                  open={showNoteModal}
                  noteVal={values.note}
                  handleNoteChange={(val) => setFieldValue("note", val)}
                  onClose={() => setShowNoteModal(false)}
                />
              )}
            </form>
          );
        }}
      </Formik>{" "}
    </Grid2>
  );
};

export default WorkflowFormPage;

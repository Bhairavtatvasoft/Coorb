import { Formik, FormikErrors, FormikTouched } from "formik";
import { useLayoutEffect, useRef, useState } from "react";
import { IObject, ISelectOpt } from "../service/commonModel";
import { CONST_WORDS, FORM_TYPE, JDBC_TYPE, yup } from "../utils/constant";
import { Button, Grid2, Paper } from "@mui/material";
import { ObjectSchema } from "yup";
import { useTranslation } from "react-i18next";
import "./Workflow.css";
import SelectField from "../components/common/SelectField";
import NoteModal from "../components/workflow/NoteModal";
import "./WorkflowFormPage.css";
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
  const newData: ITaskDetail = JSON.parse(JSON.stringify(data));

  Object.values(newData.variables).forEach((variable: Variable, i: number) => {
    if (t(variable.i18nName) === t(variable.i18nName)) {
      if (variable.jdbcType === JDBC_TYPE.Checkbox) {
        newData.variables[i + 1].numericValue =
          data.formField[t(variable.i18nName)];
      } else if (variable.jdbcType === JDBC_TYPE.DatePicker) {
        newData.variables[i + 1].textValue = moment(
          data.formField[t(variable.i18nName)]
        ).format("DD/MM/YYYY");
      } else if (variable.jdbcType === JDBC_TYPE.TimePicker) {
        newData.variables[i + 1].textValue = moment(
          data.formField[t(variable.i18nName)]
        ).format("HH:mm");
      } else if (variable.jdbcType !== JDBC_TYPE.UploadDocument) {
        newData.variables[i + 1].textValue =
          data.formField[t(variable.i18nName)];
      }
    }
  });
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

  const validationSchema = useRef<ObjectSchema<IObject> | null>(null);

  const [showNoteModal, setShowNoteModal] = useState<boolean>(false);
  const [initValues, setInitialValues] = useState<IObject>({
    formField: {},
  });
  const [groupedVariables, setGroupedVariables] = useState<IObject>({});
  const [commitStatus, setCommitStatus] = useState<ISelectOpt[]>([]);

  const requestInitiated = useRef(false);

  useLayoutEffect(() => {
    validationSchema.current = yup.object().shape({});
    if (taskInstanceId && taskInstanceTokenId) {
      getTaskDetail(taskInstanceId, taskInstanceTokenId);
    }
  }, []);

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
          localStorage.setItem(taskSessionKey, JSON.stringify(res.data));
          setupInitialValues(res.data);
        }
      });
    }
  };

  const setupInitialValues = (data: ITaskDetail) => {
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

    validationSchema.current = yup.object().shape({
      formField: yup.object().shape(newValidationSchema),
    });
    const newInitialValues = {
      ...data,
      formField: newInitVal,
      taskInstanceId: taskInstanceId,
      taskInstanceTokenId: taskInstanceTokenId,
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
      if (errors.formField) {
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
        validationSchema={validationSchema.current}
        onSubmit={() => {}}
        enableReinitialize
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
                    <TabsComponent groupedVariables={groupedVariables} />
                  ) : (
                    <WizardComponent groupedVariables={groupedVariables} />
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
                <Grid2 container spacing={1}>
                  <Grid2 size={{ xs: 12, md: 3.5 }}>
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
                  <Grid2 size={{ xs: 12, md: 3.5 }}>
                    <Button
                      variant="contained"
                      type="button"
                      className="actionBtn"
                      onClick={handleCancel}
                    >
                      {t("cancel")}
                    </Button>
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 3.5 }}>
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
                  <Grid2 size={{ xs: 12, md: 1.5 }}>
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

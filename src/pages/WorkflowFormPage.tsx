import { Formik } from "formik";
import { useLayoutEffect, useRef, useState } from "react";
import { IObject, ISelectOpt } from "../service/commonModel";
import { FORM_TYPE, JDBC_TYPE, yup } from "../utils/constant";
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
import { successToast } from "../components/common/ToastMsg";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const WorkflowFormPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { taskInstanceId, taskInstanceTokeId } = useParams();

  const validationSchema = useRef<ObjectSchema<IObject> | null>(null);

  const [showNoteModal, setShowNoteModal] = useState<boolean>(false);
  const [initValues, setInitialValues] = useState<IObject>({
    formField: {},
  });
  const [groupedVariables, setGroupedVariables] = useState<IObject>({});
  const [commitStatus, setCommitStatus] = useState<ISelectOpt[]>([]);

  useLayoutEffect(() => {
    validationSchema.current = yup.object().shape({});
    if (taskInstanceId && taskInstanceTokeId)
      getTaskDetail(taskInstanceId, taskInstanceTokeId);
  }, []);

  const getTaskDetail = (
    taskInstanceId: string,
    taskInstanceTokeId: string
  ) => {
    taskService.load(taskInstanceId, taskInstanceTokeId).then((res) => {
      if (res?.data) {
        const newInitVal: Record<string, any> = {};
        const newValidationSchema: Record<string, any> = {};
        Object.values(res.data.variables).forEach((variable) => {
          if (variable.required && !variable.hidden) {
            newValidationSchema[variable.i18nName] = yup
              .mixed()
              .required(t(variable.i18nName) + " " + t("isRequired"));
          }

          if (variable.jdbcType === JDBC_TYPE.Checkbox) {
            newInitVal[variable.i18nName] =
              variable.numericValue?.toString() === "1" ? true : false;
          } else {
            newInitVal[variable.i18nName] = variable.textValue;
          }
        });

        const newGrpVariables = Object.values(res.data.variables).reduce(
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
          ...res.data,
          formField: newInitVal,
          taskInstanceId: taskInstanceId,
          taskInstanceTokeId: taskInstanceTokeId,
        };

        const statuses = res.data.statuses;
        if (statuses) {
          setCommitStatus(
            Object.keys(statuses).map((x) => ({
              ...statuses[x],
              value: statuses[x].id,
              label: t(statuses[x].i18nName),
            }))
          );
        }

        if (res.data.selectedTaskStatus.i18nName) {
          newInitialValues["selectedTaskStatus"] = {
            ...res.data.selectedTaskStatus,
            value: res.data.selectedTaskStatus.id,
            label: t(res.data.selectedTaskStatus.i18nName),
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
      }
    });
  };

  const handleCancel = () => {
    taskService.release(taskInstanceId!, taskInstanceTokeId!).then((res) => {
      if (res) navigate(`pending`);
    });
  };

  const handleCommitTask = (values: IObject) => {
    const payload = transferObject(values);
    transferObject(values);
    taskService.commit(payload).then((res) => {
      if (res) {
        successToast(t("commitSave"));
        navigate(`pending`);
      }
    });
  };

  const handleSaveTask = (values: IObject) => {
    const payload = transferObject(values);
    transferObject(values);
    taskService.save(payload).then((res) => {
      if (res) {
        successToast(t("successSave"));
        navigate(`pending`);
      }
    });
  };

  const transferObject = (data: IObject) => {
    const newData: ITaskDetail = JSON.parse(JSON.stringify(data));

    Object.values(newData.variables).forEach(
      (variable: Variable, i: number) => {
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
          } else {
            newData.variables[i + 1].textValue =
              data.formField[t(variable.i18nName)];
          }
        }
      }
    );
    return newData;
  };

  return (
    <Paper className="workflowFormWrapper">
      <Formik
        initialValues={initValues}
        validationSchema={validationSchema.current}
        onSubmit={() => {}}
        enableReinitialize
      >
        {({ values }) => {
          return (
            <form className="workflowDetailWrapper">
              <Paper className="workflowForm" sx={{ m: 3, boxShadow: "none" }}>
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

              <Paper className="workflowBtnWrapper">
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
                      onClick={() => handleSaveTask(values)}
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
                      onClick={() => handleCommitTask(values)}
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
                  description={"This is read only field"}
                  onClose={() => setShowNoteModal(false)}
                />
              )}
            </form>
          );
        }}
      </Formik>{" "}
    </Paper>
  );
};

export default WorkflowFormPage;

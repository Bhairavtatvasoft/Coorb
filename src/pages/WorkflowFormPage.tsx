import { Formik } from "formik";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { IObject } from "../service/commonModel";
import { FORM_TYPE, JDBC_TYPE, yup } from "../utils/constant";
import { Button, Grid2, Paper } from "@mui/material";
import { ObjectSchema } from "yup";
import { useTranslation } from "react-i18next";
import "./Workflow.css";
import SelectField from "../components/common/SelectField";
import NoteModal from "../components/workflow/NoteModal";
import "./WorkflowFormPage.css";
import WizardComponent from "../components/workflow/WizardForm";
import { getMockWorkflowResponse } from "../components/workflow/mockfunctions";
import TabsComponent from "../components/workflow/TabForm";
import { taskService } from "../service/task/TaskService";

import { Variable } from "../service/workflow/WorkflowModel";
import { useParams } from "react-router";
const WorkflowFormPage = () => {
  const { t } = useTranslation();
  const validationSchema = useRef<ObjectSchema<IObject> | null>(null);
  const [showNoteModal, setShowNoteModal] = useState<boolean>(false);
  const [initValues, setInitialValues] = useState<IObject>({});
  const { taskInstanceId, tokenId } = useParams();

  useLayoutEffect(() => {
    validationSchema.current = yup.object().shape({});
  }, []);

  const { variables, renderingStyle } = getMockWorkflowResponse();

  useEffect(() => {
    const newInitVal: Record<string, any> = {};
    const newValidationSchema: Record<string, any> = {};
    Object.values(variables).forEach((variable) => {
      newValidationSchema[variable.i18nName] = yup
        .mixed()
        .required(t("errMsg"));
      if (variable.jdbcType === JDBC_TYPE.Checkbox) {
        newInitVal[variable.i18nName] =
          variable.numericValue?.toString() === "1" ? true : false;
      } else {
        newInitVal[variable.i18nName] = variable.textValue;
      }
    });
    validationSchema.current = yup.object().shape(newValidationSchema);
    setInitialValues(newInitVal);
    if (taskInstanceId && tokenId)
      getTaskDetail(taskInstanceId, Number(tokenId));
  }, []);

  const groupedVariables = Object.values(variables).reduce(
    (acc: Record<string, Variable[]>, variable: Variable) => {
      const group = variable.i18nGroupName;
      acc[group] = acc[group] || [];
      acc[group].push(variable);
      return acc;
    },
    {}
  );

  const getTaskDetail = (taskInstanceId: string, tokenId: number) => {
    taskService.load(taskInstanceId, tokenId).then((res) => {
      if (res?.data) setInitialValues(res.data);
    });
  };

  return (
    <Paper className="workflowFormWrapper">
      <Formik
        initialValues={initValues}
        validationSchema={validationSchema.current}
        onSubmit={() => {}}
        enableReinitialize
      >
        {() => {
          return (
            <form className="workflowDetailWrapper">
              <Paper sx={{ m: 3, boxShadow: "none" }}>
                <Grid2
                  size={{ xs: 12, sm: 12, md: 12, lg: 12 }}
                  key={`form-field-${1}`}
                >
                  {renderingStyle === FORM_TYPE.TAB ? (
                    <TabsComponent groupedVariables={groupedVariables} />
                  ) : (
                    <WizardComponent groupedVariables={groupedVariables} />
                  )}
                </Grid2>
              </Paper>
              <Paper className="addNoteBtn">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setShowNoteModal(true)}
                >
                  {t("addviewNote")}
                </Button>
              </Paper>
              <Paper className="workflowBtnWrapper">
                <Grid2 container spacing={1}>
                  <Grid2 size={{ xs: 12, md: 3.5 }}>
                    <Button
                      variant="contained"
                      type="button"
                      className="actionBtn"
                    >
                      {t("save")}
                    </Button>
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 3.5 }}>
                    <Button
                      variant="contained"
                      type="button"
                      className="actionBtn"
                    >
                      {t("cancel")}
                    </Button>
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 3.5 }}>
                    <Button
                      variant="contained"
                      type="button"
                      className="actionBtn"
                    >
                      {t("commit")}
                    </Button>
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 1.5 }}>
                    <SelectField
                      options={[]}
                      name={"status"}
                      instanceId=""
                      id=""
                      tokenId=""
                      hideHelp
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

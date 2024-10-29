import { Formik } from "formik";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import WorkflowFormField from "../components/common/WorkflowFormField";
import { IObject } from "../service/commonModel";
import { JDBC_TYPE, yup } from "../utils/constant";
import { Button, Grid2, Paper } from "@mui/material";
import { ObjectSchema } from "yup";
import { useTranslation } from "react-i18next";
import "./Workflow.css";
import SelectField from "../components/common/SelectField";

const WorkflowFormPage = () => {
  const { t } = useTranslation();
  const validationSchema = useRef<ObjectSchema<IObject> | null>(null);

  const [initValues, setInitialValues] = useState<IObject>({});

  const datVariables: any[] = [
    {
      id: "<string>",
      tokenId: "<integer>",
      i18nName: "firstName",
      type: "text",
      comboListName: "<string>",
      required: 1,
      hidden: 0,
      readOnly: 0,
      i18nGroupName: "<string>",
      mimeType: "<string>",
      jdbcType: JDBC_TYPE.IntegerInput,
      auditable: "<integer>",
      exitClassId: "<string>",
      exitClassDataId: "<string>",
      instanceId: "<string>",
      textValue: "",
      numericValue: "<string>",
    },
    {
      id: "<string>",
      tokenId: "Last Name",
      i18nName: "lastName",
      type: "text",
      comboListName: "<string>",
      required: 1,
      hidden: 0,
      readOnly: 0,
      i18nGroupName: "<string>",
      mimeType: "<string>",
      jdbcType: JDBC_TYPE.TextInput,
      auditable: "<integer>",
      exitClassId: "<string>",
      exitClassDataId: "<string>",
      instanceId: "<string>",
      textValue: "Doe",
      numericValue: "<string>",
    },
    {
      id: "<string>",
      tokenId: "<integer>",
      i18nName: "dateOfBirth",
      type: "text",
      comboListName: "<string>",
      required: 1,
      hidden: 0,
      readOnly: 0,
      i18nGroupName: "<string>",
      mimeType: "<string>",
      jdbcType: JDBC_TYPE.DatePicker,
      auditable: "<integer>",
      exitClassId: "<string>",
      exitClassDataId: "<string>",
      instanceId: "<string>",
      textValue: "https://google.com",
      numericValue: "1",
    },
    {
      id: "<string>",
      tokenId: "<integer>",
      i18nName: "appointmentTime",
      type: "text",
      comboListName: "<string>",
      required: 1,
      hidden: 0,
      readOnly: 0,
      i18nGroupName: "<string>",
      mimeType: "<string>",
      jdbcType: JDBC_TYPE.TimePicker,
      auditable: "<integer>",
      exitClassId: "<string>",
      exitClassDataId: "<string>",
      instanceId: "<string>",
      textValue: "10/11/2025",
      numericValue: "1",
    },
    {
      id: "<string>",
      tokenId: "<integer>",
      i18nName: "passport",
      type: "text",
      comboListName: "<string>",
      required: 1,
      hidden: 0,
      readOnly: 0,
      i18nGroupName: "<string>",
      mimeType: "<string>",
      jdbcType: JDBC_TYPE.UploadDocument,
      auditable: "<integer>",
      exitClassId: "<string>",
      exitClassDataId: "<string>",
      instanceId: "<string>",
      textValue: "",
      numericValue: "1",
    },
    {
      id: "<string>",
      tokenId: "<integer>",
      i18nName: "description",
      type: "text",
      comboListName: "<string>",
      required: 1,
      hidden: 0,
      readOnly: 0,
      i18nGroupName: "<string>",
      mimeType: "<string>",
      jdbcType: JDBC_TYPE.TextAreaInput,
      auditable: "<integer>",
      exitClassId: "<string>",
      exitClassDataId: "<string>",
      instanceId: "<string>",
      textValue: "",
      numericValue: "1",
    },
    {
      id: "<string>",
      tokenId: "<integer>",
      i18nName: "readonlyLbl",
      type: "text",
      comboListName: "<string>",
      required: 1,
      hidden: 0,
      readOnly: 0,
      i18nGroupName: "<string>",
      mimeType: "<string>",
      jdbcType: JDBC_TYPE.Label,
      auditable: "<integer>",
      exitClassId: "<string>",
      exitClassDataId: "<string>",
      instanceId: "<string>",
      textValue: "",
      numericValue: "1",
    },
    {
      id: "<string>",
      tokenId: "<integer>",
      i18nName: "clickMeToOpenLink",
      type: "text",
      comboListName: "<string>",
      required: 1,
      hidden: 0,
      readOnly: 0,
      i18nGroupName: "<string>",
      mimeType: "<string>",
      jdbcType: JDBC_TYPE.URL,
      auditable: "<integer>",
      exitClassId: "<string>",
      exitClassDataId: "<string>",
      instanceId: "<string>",
      textValue: "",
      numericValue: "1",
    },
  ];

  useLayoutEffect(() => {
    validationSchema.current = yup.object().shape({});
  }, []);

  useEffect(() => {
    const newInitVal: IObject = {};
    const newValidationSchema: IObject = {};
    datVariables.forEach((obj) => {
      newValidationSchema[obj.i18nName] = yup.mixed().required(t("errMsg"));
      if (+obj.jdbcType === JDBC_TYPE.Checkbox)
        newInitVal[obj.i18nName] =
          obj.numericValue?.toString() === "1" ? true : false;
      else newInitVal[obj.i18nName] = obj.textValue;
    });
    validationSchema.current = yup.object().shape(newValidationSchema);
    setInitialValues(newInitVal);
  }, []);

  return (
    <Formik
      initialValues={initValues}
      validationSchema={validationSchema.current}
      onSubmit={() => {}}
      enableReinitialize
    >
      {() => {
        return (
          <form className="workflowDetailWrapper">
            <Paper sx={{ m: 3 }}>
              <Grid2 container spacing={3} sx={{ p: 2 }}>
                {[...datVariables].map((item: any, i: number) => {
                  return (
                    <Grid2
                      size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                      key={`form-field-${i}`}
                    >
                      <WorkflowFormField {...item} />
                    </Grid2>
                  );
                })}
              </Grid2>
            </Paper>
            <Paper className="workflowBtnWrapper">
              <Button variant="contained" type="button">
                {t("save")}
              </Button>
              <Button variant="contained" type="button">
                {t("cancel")}
              </Button>
              <Button variant="contained" type="button">
                {t("commit")}
              </Button>
              <SelectField
                options={[]}
                name={"status"}
                instanceId=""
                id=""
                tokenId=""
                hideHelp
              />
            </Paper>
          </form>
        );
      }}
    </Formik>
  );
};

export default WorkflowFormPage;

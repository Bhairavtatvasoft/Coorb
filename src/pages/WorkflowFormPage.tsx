import { Formik } from "formik";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import WorkflowFormField from "../components/common/WorkflowFormField";
import { IObject } from "../service/commonModel";
import { JDBC_TYPE, yup } from "../utils/constant";
import { Grid2, Paper } from "@mui/material";
import { ObjectSchema } from "yup";

const WorkflowFormPage = () => {
  const validationSchema = useRef<ObjectSchema<IObject> | null>(null);

  const [initValues, setInitialValues] = useState<IObject>({});

  const abcd: any[] = [
    {
      id: "<string>",
      tokenId: "<integer>",
      i18nName: "field1",
      type: "text",
      comboListName: "<string>",
      required: 1,
      hidden: 0,
      readOnly: 0,
      i18nGroupName: "<string>",
      mimeType: "<string>",
      jdbcType: "4",
      auditable: "<integer>",
      exitClassId: "<string>",
      exitClassDataId: "<string>",
      instanceId: "<string>",
      textValue: "<string>",
      numericValue: "<string>",
    },
    {
      id: "<string>",
      tokenId: "<integer>",
      i18nName: "field2",
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
      textValue: "<string>",
      numericValue: "<string>",
    },
    {
      id: "<string>",
      tokenId: "<integer>",
      i18nName: "field3",
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
      textValue: "https://google.com",
      numericValue: "1",
    },
    {
      id: "<string>",
      tokenId: "<integer>",
      i18nName: "field",
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
      textValue: "10/11/2025",
      numericValue: "1",
    },
    {
      id: "<string>",
      tokenId: "<integer>",
      i18nName:
        "field 3field 3field 3field 3field 3 field 3field 3field 3field 3field 3",
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
      i18nName:
        "field 3field 3field 3field 3field 3 field 3field 3field 3field 3field 3",
      type: "text",
      comboListName: "<string>",
      required: 1,
      hidden: 0,
      readOnly: 1,
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
  ];

  useLayoutEffect(() => {
    validationSchema.current = yup.object().shape({});
  });

  useEffect(() => {
    const newInitVal: IObject = {};
    const newValidationSchema: IObject = {};
    abcd.forEach((obj) => {
      newValidationSchema[obj.i18nName] = yup.mixed().required();
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
          <form>
            <Paper sx={{ m: 3 }}>
              <Grid2 container spacing={3} sx={{ p: 2 }}>
                {[...abcd].map((item: any, i: number) => {
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
          </form>
        );
      }}
    </Formik>
  );
};

export default WorkflowFormPage;

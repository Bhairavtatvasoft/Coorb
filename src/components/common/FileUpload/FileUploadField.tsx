import { Button } from "@mui/material";
import { Field, FieldProps, FormikContextType, useFormikContext } from "formik";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { IGenericFieldProps, IObject } from "../../../service/commonModel";
import FieldHelper from "../FieldHelper";
import { UploadFile, Visibility } from "@mui/icons-material";
import ViewUploadedFile from "./ViewUploadedFileModal";
import { fileService } from "../../../service/file/FileService";
import { ALLOWED_FILE_EXTENSION } from "../../../utils/constant";
import { errorToast } from "../ToastMsg";

export type ViewFileDetail = {
  show: boolean;
  fileData: string;
  fileType: string;
};

const FileUploadField: FC<IGenericFieldProps & { isServerUpload?: boolean }> = (
  props
) => {
  const { t } = useTranslation();
  const { name, required, readOnly, lbl, isServerUpload = false } = props;
  const { setFieldValue, values, setValues }: FormikContextType<IObject> =
    useFormikContext();

  const [viewFileDetail, setViewFileDetail] = useState<ViewFileDetail>({
    fileData: "",
    fileType: "",
    show: false,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];

    if (file) {
      if (
        ALLOWED_FILE_EXTENSION.includes(
          file.name.split(".").at(-1)!.toLowerCase()
        )
      ) {
        if (isServerUpload) {
          if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
              fileService
                .upload(
                  {
                    fileName: file.name,
                    flowInstanceId: values.workflowInstanceId,
                    flowInstanceTokenId: values.data[8],
                    taskInstanceId: values.taskInstanceId,
                    taskInstanceTokenId: values.taskInstanceTokenId,
                    variableTypeId: props.id!,
                    variableTypeTokenId: Number(props.tokenId),
                  },
                  reader.result!.toString()
                )
                .then((res) => {
                  if (res?.data?.message) {
                    const existingValues = JSON.parse(JSON.stringify(values));
                    const varName = name?.split(".")?.at(-1) ?? name;
                    Object.values(existingValues.variables).forEach(
                      (x: any, index: number) => {
                        if (x.i18nName === varName) {
                          existingValues.variables[index + 1].textValue =
                            res?.data?.message;
                        }
                      }
                    );
                    setValues(existingValues);
                    setFieldValue(name, res?.data?.message, true);
                    setViewFileDetail({
                      fileData: "",
                      fileType: "",
                      show: false,
                    });
                    event.target.value = "";
                  }
                });
            };

            reader.readAsDataURL(file);
          }
        } else {
          setFieldValue(name, file, true);
        }
      } else {
        errorToast(t("allowedFileExtensionError"));
      }
    }
  };
  return (
    <>
      <Field name={name}>
        {({ meta, field }: FieldProps) => (
          <div className="fieldWrapper">
            <input
              id={`upload-button-${name}`}
              type="file"
              className="dNone"
              onChange={handleFileChange}
              disabled={Boolean(readOnly)}
              accept=".pdf,.jpeg,.jpg,.png,.gif"
            />
            <div>
              <label
                className={`fileUploadLabel ${
                  readOnly === 1 ? "disabled" : ""
                } ${meta.touched && meta.error ? "errorBorderDashed" : ""}`}
                // onClick={() => setFieldTouched(name, true, true)}
                htmlFor={readOnly === 1 ? "" : `upload-button-${name}`}
              >
                <div className="labelWrapper">
                  <UploadFile />
                  {t(lbl ? lbl : `uploadFile`)} {required ? "*" : ""}
                </div>
                <p>{t("uploadFileDesc")}</p>
              </label>

              {field.value && (
                <Button
                  variant="outlined"
                  type="button"
                  size="small"
                  className="fileViewButton"
                  title={t("viewFile")}
                  onClick={() => {
                    setViewFileDetail({ ...viewFileDetail, show: true });
                  }}
                >
                  <Visibility fontSize={"small"} />
                  {t("viewFile")}
                </Button>
              )}
              {meta.touched && meta.error && (
                <div className="errorText">{meta.error}</div>
              )}
            </div>
            <FieldHelper desc={t(lbl + "_desc")} />
          </div>
        )}
      </Field>

      {viewFileDetail.show && (
        <ViewUploadedFile
          handleClose={() =>
            setViewFileDetail({ ...viewFileDetail, show: false })
          }
          setFileDetail={(fileData, fileType) => {
            setViewFileDetail({ ...viewFileDetail, fileData, fileType });
          }}
          viewFileDetail={viewFileDetail}
          taskInstanceId={values.taskInstanceId}
          taskInstanceTokenId={values.taskInstanceTokenId}
          variableTypeId={props.id!}
          variableTypeTokenId={Number(props.tokenId)}
        />
      )}
    </>
  );
};

export default FileUploadField;

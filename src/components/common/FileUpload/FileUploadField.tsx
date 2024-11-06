import { Button } from "@mui/material";
import { Field, FieldProps, FormikContextType, useFormikContext } from "formik";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { IGenericFieldProps, IObject } from "../../../service/commonModel";
import FieldHelper from "../FieldHelper";
import { UploadFile, Visibility } from "@mui/icons-material";
import ViewUploadedFile from "./ViewUploadedFileModal";
import { fileService } from "../../../service/file/FileService";

export type ViewFileDetail = {
  show: boolean;
  file: any;
};

const FileUploadField: FC<IGenericFieldProps & { isServerUpload?: boolean }> = (
  props
) => {
  const { t } = useTranslation();
  const { name, required, readOnly, lbl, isServerUpload = false } = props;
  const {
    setFieldValue,
    setFieldTouched,
    values,
    setValues,
  }: FormikContextType<IObject> = useFormikContext();

  const [viewFileDetail, setViewFileDetail] = useState<ViewFileDetail>({
    file: null,
    show: false,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];

    if (file) {
      if (isServerUpload) {
        const reader = new FileReader();

        reader.onload = function (e: ProgressEvent<FileReader>) {
          const arrayBuffer = e.target?.result;

          if (arrayBuffer instanceof ArrayBuffer) {
            const byteArray = new Uint8Array(arrayBuffer);
            fileService
              .upload(
                {
                  fileName: file.name,
                  flowInstanceId: values.workflowInstanceId,
                  flowInstanceTokenId: values.data[8],
                  taskInstanceId: values.taskInstanceId,
                  taskInstanceTokenId: values.taskInstanceTokeId,
                  variableTypeId: Number(props.type),
                  variableTypeTokenId: Number(props.tokenId),
                },
                byteArray
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
                }
              });
          }
        };

        reader.readAsArrayBuffer(file);
      } else {
        setFieldValue(name, file, true);
      }
    }
  };
  return (
    <>
      <Field name={name}>
        {({ meta, field }: FieldProps) => (
          <div className="fieldWrapper">
            <input
              accept="*"
              id={`upload-button-${name}`}
              type="file"
              className="dNone"
              onChange={handleFileChange}
              disabled={Boolean(readOnly)}
            />
            <div>
              <label
                className={`fileUploadLabel ${
                  readOnly === 1 ? "disabled" : ""
                } ${meta.touched && meta.error ? "errorBorderDashed" : ""}`}
                onClick={() => setFieldTouched(name, true, true)}
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
          setFileDetail={(file) => {
            setViewFileDetail({ ...viewFileDetail, file });
          }}
          viewFileDetail={viewFileDetail}
          taskInstanceId={props.instanceId!}
          taskInstanceTokenId={props.instanceId!}
          variableTypeId={props.id!}
          variableTypeTokenId={props.tokenId!}
        />
      )}
    </>
  );
};

export default FileUploadField;

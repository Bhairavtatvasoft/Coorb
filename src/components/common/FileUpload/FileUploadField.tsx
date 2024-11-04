import { Button } from "@mui/material";
import { Field, FieldProps, useFormikContext } from "formik";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { IGenericFieldProps } from "../../../service/commonModel";
import FieldHelper from "../FieldHelper";
import { UploadFile, Visibility } from "@mui/icons-material";
import ViewUploadedFile from "./ViewUploadedFileModal";

export type ViewFileDetail = {
  show: boolean;
  file: any;
};

const FileUploadField: FC<IGenericFieldProps> = (props) => {
  const { t } = useTranslation();
  const { name, required, readOnly, lbl } = props;

  const { setFieldValue, setFieldTouched } = useFormikContext();

  const [viewFileDetail, setViewFileDetail] = useState<ViewFileDetail>({
    file: null,
    show: false,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      setFieldValue(name, file, true);
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
                }`}
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
            </div>
            <FieldHelper desc={t(lbl + "_desc")} />

            {meta.touched && meta.error && (
              <div className="errorText">{meta.error}</div>
            )}
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

import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Field, FieldProps, FormikContextType, useFormikContext } from "formik";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { IGenericFieldProps } from "../../service/commonModel";
import FieldHelper from "./FieldHelper";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const InputTextField: FC<IGenericFieldProps> = (props) => {
  const { t } = useTranslation();
  const {
    lbl,
    name,
    fieldType = "text",
    placeholder,
    required,
    readOnly,
    valRegex,
    hideHelp = false,
    fullWidth = false,
    className,
    slotProps,
  } = props;
  const [showPassword, setShowPassword] = useState(false);

  const { setFieldValue, setFieldTouched }: FormikContextType<{ [key: string]: any }> =
    useFormikContext();

  const isTextArea = fieldType === "textarea";

  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <div className={`fieldWrapper ${className}`}>
          <TextField
            size="small"
            id={`textfield-${name}`}
            fullWidth={fullWidth}
            label={`${t(lbl ? lbl : name)} ${required ? "*" : ""}`}
            variant="outlined"
            type={fieldType === "password" ? (showPassword ? "text" : "password") : fieldType}
            placeholder={placeholder}
            {...field}
            value={field.value ?? ""}
            multiline={isTextArea}
            rows={isTextArea ? 4 : 1}
            onChange={(e) => {
              const targetVal = e.target.value;
              if (valRegex) {
                if (valRegex.test(targetVal)) setFieldValue(name, targetVal);
              } else {
                setFieldValue(name, targetVal);
              }
            }}
            onBlur={(e) => {
              setFieldTouched(name, true, true);
              setFieldValue(name, e.target?.value?.trim(), true);
            }}
            error={Boolean(meta.touched && meta.error)}
            helperText={meta.touched && meta.error ? meta.error : undefined}
            disabled={Boolean(readOnly)}
            autoComplete="off"
            slotProps={
              slotProps
                ? slotProps
                : Boolean(readOnly) && field.value
                ? {
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            size="small"
                            title={t("copyText")}
                            onClick={() => {
                              if (navigator.clipboard) {
                                navigator.clipboard.writeText(field.value);
                              } else {
                                const textAreaEl = document.createElement("textarea");
                                textAreaEl.value = field.value;
                                document.body.appendChild(textAreaEl);
                                textAreaEl.select();
                                document.execCommand("copy");
                                document.body.removeChild(textAreaEl);
                              }
                            }}
                          >
                            <ContentCopyIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }
                : fieldType === "password"
                ? {
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton size="small" onClick={() => setShowPassword((prev) => !prev)}>
                            {showPassword ? (
                              <VisibilityOff fontSize="small" />
                            ) : (
                              <Visibility fontSize="small" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }
                : undefined
            }
          />
          {!hideHelp && <FieldHelper desc={t(lbl + "_desc")} />}
        </div>
      )}
    </Field>
  );
};

export default InputTextField;

import { TextField } from "@mui/material";
import { Field, FieldProps, FormikContextType, useFormikContext } from "formik";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IGenericFieldProps } from "../../service/commonModel";

const InputTextField: FC<IGenericFieldProps> = (props) => {
  const { t } = useTranslation();
  const {
    name,
    type = "text",
    placeholder,
    required,
    readOnly,
    valRegex,
  } = props;

  const {
    setFieldValue,
    setFieldTouched,
    values,
  }: FormikContextType<{ [key: string]: any }> = useFormikContext();

  const [val, setVal] = useState<string>("");

  useEffect(() => {
    const timeOut = setTimeout(() => {
      handleSetFieldVal();
    }, 200);
    return () => {
      clearTimeout(timeOut);
    };
  }, [val]);

  useEffect(() => {
    setVal(values?.[name]);
  }, [values?.[name]]);

  const handleSetFieldVal = (newVal = val) => {
    setFieldTouched(name, true, true);
    setFieldValue(name, newVal, true);
  };

  const isTextArea = type === "textarea";
  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <>
          <TextField
            size="small"
            id={`textfield-${name}`}
            label={`${t(name)} ${required ? "*" : ""}`}
            variant="outlined"
            type={type}
            placeholder={placeholder}
            {...field}
            value={val}
            multiline={isTextArea}
            rows={isTextArea ? 4 : 1}
            onChange={(e) => {
              const targetVal = e.target.value;
              if (valRegex) {
                if (valRegex.test(targetVal)) setVal(targetVal);
              } else {
                setVal(targetVal);
              }
            }}
            onBlur={(e) => {
              handleSetFieldVal(e.target.value?.trim());
            }}
            error={Boolean(meta.touched && meta.error)}
            helperText={meta.touched && meta.error ? meta.error : undefined}
            disabled={Boolean(readOnly)}
            autoComplete="off"
          />
        </>
      )}
    </Field>
  );
};

export default InputTextField;

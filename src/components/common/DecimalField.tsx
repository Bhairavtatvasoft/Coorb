import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Field, FieldProps, useFormikContext } from "formik";
import { NumericFormat } from "react-number-format";
import FieldHelper from "./FieldHelper";
import { IGenericFieldProps } from "../../service/commonModel";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface IDecimalFieldProps extends IGenericFieldProps {
  fractionDigits?: number;
}

const DecimalField: FC<IDecimalFieldProps> = ({
  name,
  lbl,
  placeholder,
  required,
  readOnly,
  fractionDigits = 2,
}) => {
  const { t } = useTranslation();
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, "");

    setFieldTouched(name, true, true);

    if (rawValue === "") {
      setFieldValue(name, "", true);
    } else {
      const parsedValue = parseFloat(rawValue);
      if (!isNaN(parsedValue)) {
        setFieldValue(name, parsedValue.toFixed(fractionDigits), true);
      } else {
        setFieldValue(name, "", true);
      }
    }
  };

  const getDecimalValue = (value: string) => {
    const rawValue = value.replace(/,/g, "");

    if (rawValue === "") {
      return "";
    } else {
      const parsedValue = parseFloat(rawValue);
      if (!isNaN(parsedValue)) {
        return parsedValue.toFixed(fractionDigits);
      } else {
        return "";
      }
    }
  };

  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <div className="fieldWrapper">
          <NumericFormat
            customInput={TextField}
            size="small"
            id={`decimalField-${name}`}
            label={`${t(lbl)} ${required ? "*" : ""}`}
            variant="outlined"
            type="text"
            placeholder={placeholder}
            {...field}
            value={field.value || ""}
            onChange={handleValueChange}
            decimalScale={fractionDigits}
            fixedDecimalScale
            thousandSeparator=","
            allowNegative={false}
            onBlur={() => {
              setFieldTouched(name, true, true);
            }}
            slotProps={
              Boolean(readOnly) && field.value
                ? {
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            size="small"
                            title={t("copyText")}
                            onClick={() =>
                              navigator.clipboard.writeText(getDecimalValue(field.value))
                            }
                          >
                            <ContentCopyIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }
                : undefined
            }
            error={Boolean(meta.touched && meta.error)}
            helperText={meta.touched && meta.error ? meta.error : undefined}
            disabled={Boolean(readOnly)}
            autoComplete="off"
          />
          <FieldHelper desc={t(lbl + "_desc")} />
        </div>
      )}
    </Field>
  );
};

export default DecimalField;

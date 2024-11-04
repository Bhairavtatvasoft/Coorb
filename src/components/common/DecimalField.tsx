import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Field, FieldProps, FormikContextType, useFormikContext } from "formik";
import { NumericFormat } from "react-number-format";
import FieldHelper from "./FieldHelper";
import { IGenericFieldProps, IObject } from "../../service/commonModel";
import { TextField } from "@mui/material";

interface IDecimalFieldProps extends IGenericFieldProps {
  fractionDigits?: number;
}

const DecimalField: FC<IDecimalFieldProps> = ({
  name,
  placeholder,
  required,
  readOnly,
  fractionDigits = 2,
}) => {
  const { t } = useTranslation();
  const { setFieldValue, setFieldTouched, values }: FormikContextType<IObject> =
    useFormikContext();
  const [displayValue, setDisplayValue] = useState<string>("");

  useEffect(() => {
    if (values?.[name] && displayValue === "") {
      const initialFormattedValue = parseFloat(values[name]).toFixed(
        fractionDigits
      );
      setFieldValue(name, initialFormattedValue, true);
      setDisplayValue(formatDecimal(initialFormattedValue));
    }
  }, [values[name]]);

  const formatDecimal = (value: string | number) => {
    return parseFloat(value as string).toLocaleString("en-US", {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    });
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const rawValue = parseFloat(e.target.value.replace(/,/g, ""));
      setFieldValue(name, rawValue.toFixed(fractionDigits), true);
      setDisplayValue(formatDecimal(rawValue));
    } else {
      setFieldValue(name, "", true);
      setDisplayValue("");
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
            label={`${t(name)} ${required ? "*" : ""}`}
            variant="outlined"
            type="text"
            placeholder={placeholder}
            {...field}
            value={displayValue}
            onChange={handleValueChange}
            decimalScale={fractionDigits}
            fixedDecimalScale
            thousandSeparator=","
            allowNegative={false}
            onBlur={() => {
              setFieldTouched(name, true, true);
            }}
            error={Boolean(meta.touched && meta.error)}
            helperText={meta.touched && meta.error ? meta.error : undefined}
            disabled={Boolean(readOnly)}
            autoComplete="off"
          />
          <FieldHelper desc={t(name + "_desc")} />
        </div>
      )}
    </Field>
  );
};

export default DecimalField;

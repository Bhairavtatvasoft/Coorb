import { TextField } from "@mui/material";
import { Field, FieldProps, FormikContextType, useFormikContext } from "formik";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IGenericFieldProps, IObject } from "../../service/commonModel";
import FieldHelper from "./FieldHelper";
import { regex } from "../../utils/regex";

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
  const valRegex = regex.Decimal;

  const { setFieldValue, setFieldTouched, values }: FormikContextType<IObject> =
    useFormikContext();
  const [displayValue, setDisplayValue] = useState<string>("");
  useEffect(() => {
    if (values?.[name] && displayValue === "") {
      setFieldValue(
        name,
        parseFloat(values[name]).toFixed(fractionDigits),
        true
      );
      setDisplayValue(formatDecimal(values[name]));
    }
  }, [values[name]]);

  const formatDecimal = (value: string) => {
    return parseFloat(value).toLocaleString("en-US", {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setDisplayValue("");
      setFieldValue(name, "", true);
      return;
    }
    const inputElement = e.target;
    const rawValue = inputElement.value.replace(/,/g, "");
    if (!valRegex.test(rawValue)) return;
    const cursorPosition = inputElement.selectionStart || 0;
    setFieldValue(name, parseFloat(rawValue).toFixed(fractionDigits), true);
    const formattedValue = formatDecimal(rawValue);
    setDisplayValue(formattedValue);
    const commaDifference =
      (formattedValue.match(/,/g) || []).length -
      (inputElement.value.match(/,/g) || []).length;
    const newCursorPosition = cursorPosition + commaDifference;
    setTimeout(() => {
      inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
    }, 0);
  };

  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <div className="fieldWrapper">
          <TextField
            size="small"
            id={`decimalField-${name}`}
            label={`${t(name)} ${required ? "*" : ""}`}
            variant="outlined"
            type="text"
            placeholder={placeholder}
            {...field}
            value={displayValue}
            onChange={handleInputChange}
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

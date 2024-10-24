import { FC } from "react";
import { IGenericFieldProps } from "../../service/commonModel";
import { useTranslation } from "react-i18next";
import { Field, FieldProps, FormikContextType, useFormikContext } from "formik";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import FieldHelper from "./FieldHelper";

const CheckboxField: FC<IGenericFieldProps> = (props) => {
  const { t } = useTranslation();
  const {
    setFieldValue,
    setFieldTouched,
  }: FormikContextType<{ [key: string]: any }> = useFormikContext();

  const { name, required, readOnly } = props;

  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <div className="fieldWrapper">
          <FormControl
            required
            error={Boolean(meta.touched && meta.error)}
            component="fieldset"
            variant="standard"
          >
            <FormControlLabel
              className="checkboxFormField"
              control={
                <Checkbox
                  id={`checkbox-field-${name}`}
                  {...field}
                  checked={field.value ? true : false}
                  value={field.value}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setFieldTouched(name, true, true);
                    setFieldValue(name, isChecked, true);
                  }}
                  disabled={Boolean(readOnly)}
                />
              }
              label={`${t(name)} ${required ? "*" : ""}`}
            />

            <FormHelperText>
              {meta.touched && meta.error ? meta.error : undefined}
            </FormHelperText>
          </FormControl>
          <FieldHelper desc={t(name + "_desc")} />
        </div>
      )}
    </Field>
  );
};

export default CheckboxField;

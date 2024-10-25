import { InputAdornment, TextField } from "@mui/material";
import { Field, FieldProps, FormikContextType, useFormikContext } from "formik";
import { FC } from "react";
import DatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";
import { IGenericFieldProps, IObject } from "../../service/commonModel";
import FieldHelper from "./FieldHelper";
import * as locale from "date-fns/locale";
import { isValid } from "date-fns";
import { AccessTime } from "@mui/icons-material";

const TimePickerField: FC<IGenericFieldProps> = (props) => {
  const { t, i18n } = useTranslation();
  const { setFieldValue, setFieldTouched }: FormikContextType<IObject> =
    useFormikContext();

  const { name, required, readOnly } = props;
  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => {
        const isValidValue = field.value && isValid(new Date(field.value));
        return (
          <div className="fieldWrapper">
            <div>
              <DatePicker
                isClearable
                customInput={
                  <TextField
                    size="small"
                    variant="outlined"
                    fullWidth
                    label={`${t(name)} ${required ? "*" : ""}`}
                    error={Boolean(meta.touched && meta.error)}
                    helperText={
                      meta.touched && meta.error ? meta.error : undefined
                    }
                    slotProps={{
                      input: {
                        readOnly: true,
                        endAdornment: (!field.value || !isValidValue) && (
                          <InputAdornment position="end">
                            <AccessTime />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                }
                onChange={(date) => {
                  setFieldTouched(name, true, true);
                  setFieldValue(name, date, true);
                }}
                selected={isValidValue ? new Date(field.value) : null}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption={t("time")}
                locale={
                  locale[i18n.language as "ar" | "enUS"]
                    ? locale[i18n.language as "ar" | "enUS"]
                    : locale.enUS
                }
                disabled={readOnly === 1}
                timeFormat="HH:mm"
                dateFormat="HH:mm"
                showPopperArrow={false}
                disabledKeyboardNavigation
              />
            </div>
            <FieldHelper desc={t(name + "_desc")} />
          </div>
        );
      }}
    </Field>
  );
};

export default TimePickerField;

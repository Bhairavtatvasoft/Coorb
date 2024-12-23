import { InputAdornment, TextField } from "@mui/material";
import { Field, FieldProps, FormikContextType, useFormikContext } from "formik";
import { FC } from "react";
import DatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";
import { IGenericFieldProps, IObject } from "../../service/commonModel";
import FieldHelper from "./FieldHelper";
import * as locale from "date-fns/locale";
import { CalendarMonth } from "@mui/icons-material";
import moment from "moment";

const DatePickerField: FC<IGenericFieldProps> = (props) => {
  const { t, i18n } = useTranslation();
  const { setFieldValue, setFieldTouched }: FormikContextType<IObject> =
    useFormikContext();

  const { name, required, readOnly, lbl } = props;
  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => {
        const isValidValue =
          field.value && moment(field.value, "DD/MM/YYYY", true).isValid();

        return (
          <div className="fieldWrapper">
            <div>
              <DatePicker
                isClearable
                popperClassName="custom-datepicker"
                customInput={
                  <TextField
                    size="small"
                    variant="outlined"
                    fullWidth
                    label={`${t(lbl)} ${required ? "*" : ""}`}
                    className="datePickerField"
                    error={Boolean(meta.touched && meta.error)}
                    helperText={
                      meta.touched && meta.error ? meta.error : undefined
                    }
                    autoComplete="off"
                    slotProps={{
                      input: {
                        readOnly: true,
                        endAdornment: (!field.value || !isValidValue) && (
                          <InputAdornment
                            position="end"
                            style={{ marginInlineEnd: "0px" }}
                          >
                            <CalendarMonth />
                          </InputAdornment>
                        ),
                      },
                      inputLabel: {
                        className: "datePickerLabel",
                      },
                    }}
                  />
                }
                onChange={(date) => {
                  setFieldTouched(name, true, true);
                  setFieldValue(name, moment(date).format("DD/MM/YYYY"), true);
                }}
                selected={
                  isValidValue
                    ? moment(field.value, "DD/MM/YYYY", true).toDate()
                    : null
                }
                clearButtonClassName={
                  readOnly === 1 ? "datePickerCloseButton" : ""
                }
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                locale={
                  locale[i18n.language as "ar" | "enUS"]
                    ? locale[i18n.language as "ar" | "enUS"]
                    : locale.enUS
                }
                disabled={readOnly === 1}
                dateFormat={"dd/MM/YYYY"}
                showPopperArrow={false}
                disabledKeyboardNavigation
                onBlur={() => {
                  setFieldTouched(name, true, true);
                }}
              />
            </div>
            <FieldHelper desc={t(lbl + "_desc")} />
          </div>
        );
      }}
    </Field>
  );
};

export default DatePickerField;

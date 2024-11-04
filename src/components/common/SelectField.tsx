import { Autocomplete, TextField } from "@mui/material";
import { Field, FieldProps, useFormikContext } from "formik";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IGenericFieldProps,
  IObject,
  ISelectOpt,
} from "../../service/commonModel";
import FieldHelper from "./FieldHelper";
import { listService } from "../../service/list/ListService";

const SelectField: FC<IGenericFieldProps & IObject> = ({
  name,
  options,
  onChange,
  required = false,
  readOnly,
  hideClr = false,
  fetchOpt = false,
  comboListName,
  lbl,
  hideHelp = false,
}) => {
  const { t } = useTranslation();
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const [localOptions, setLocalOptions] = useState<ISelectOpt[]>([]);
  useEffect(() => {
    if (Array.isArray(options)) setLocalOptions(options);
  }, [options]);

  useEffect(() => {
    if (fetchOpt && comboListName) getOptions();
  }, [fetchOpt, comboListName]);

  const getOptions = () => {
    listService.getListOptions(comboListName).then((res) => {
      if (res?.data) {
        const newOpts: ISelectOpt[] = [];
        Object.keys(res.data).forEach((key) => {
          newOpts.push({ label: res.data[key], value: key });
        });
        setLocalOptions(newOpts);
      }
    });
  };

  const handleChange = (_: React.SyntheticEvent, value: any) => {
    setFieldValue(name, value);
    setTimeout(() => {
      setFieldTouched(name, true, true);
    }, 0);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <div className={`fieldWrapper ${hideHelp ? "fullGrid" : ""}`}>
          <Autocomplete
            disablePortal
            options={localOptions}
            size="small"
            getOptionLabel={(x) => x.label?.toString()}
            value={
              localOptions?.find(
                (x) => x.value?.toString() === field.value?.value?.toString()
              ) || null
            }
            onChange={handleChange}
            noOptionsText={t("noOptionsAvailable")}
            disabled={readOnly === 1}
            disableClearable={hideClr || required ? true : false}
            renderInput={(params) => (
              <TextField
                {...params}
                label={`${t(lbl)} ${required ? "*" : ""}`}
                error={Boolean(meta.touched && meta.error)}
                helperText={meta.touched && meta.error ? meta.error : undefined}
                disabled={readOnly === 1}
              />
            )}
            onClose={() => setFieldTouched(name, true, true)}
            onBlur={() => setFieldTouched(name, true, true)}
          />
          {!hideHelp && <FieldHelper desc={t(lbl + "_desc")} />}
        </div>
      )}
    </Field>
  );
};

export default SelectField;

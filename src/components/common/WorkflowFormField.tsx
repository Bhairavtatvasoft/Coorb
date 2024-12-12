import { FC, useState } from "react";
import CheckboxField from "./CheckboxField";
import InputTextField from "./InputTextField";
import { regex } from "../../utils/regex";
import { JDBC_TYPE } from "../../utils/constant";
import ButtonField from "./ButtonField";
import LabelField from "./LabelField";
import URLField from "./URLField";
import DatePickerField from "./DatePickerField";
import TimePickerField from "./TimePickerField";
import FileUploadField from "./FileUpload/FileUploadField";
import DecimalField from "./DecimalField";
import SelectField from "./SelectField";
import { Variable } from "../../service/workflow/WorkflowModel";
import { ISelectOpt } from "../../service/commonModel";

const WorkflowFormField: FC<
  Variable & { handleBtnClick: (data: any) => void }
> = (props) => {
  const { jdbcType, hidden, handleBtnClick } = props;

  const [comboListOptions, setComboListOptions] = useState<{
    [key: string]: ISelectOpt[];
  }>({});

  if (hidden) return <></>;

  const transferredProps: Variable & { name: string; lbl: string } = {
    ...props,
    name: "formField." + props.i18nName,
    lbl: props.i18nName,
  };
  switch (Number(jdbcType)) {
    case JDBC_TYPE.Button:
      return (
        <ButtonField
          {...transferredProps}
          isServerClick
          handleClick={(data) => handleBtnClick(data)}
        />
      );

    case JDBC_TYPE.IntegerInput:
      if (transferredProps.comboListName)
        return (
          <SelectField
            {...transferredProps}
            fetchOpt={!comboListOptions[transferredProps.name]}
            options={comboListOptions[transferredProps.name]}
            setComboListOptions={setComboListOptions}
          />
        );
      return <InputTextField valRegex={regex.Integer} {...transferredProps} />;

    case JDBC_TYPE.TextInput:
      return <InputTextField {...transferredProps} />;

    case JDBC_TYPE.Password:
      return <InputTextField {...transferredProps} fieldType="password" />;

    case JDBC_TYPE.TextAreaInput:
      return <InputTextField fieldType="textarea" {...transferredProps} />;

    case JDBC_TYPE.Checkbox:
      return <CheckboxField {...transferredProps} />;

    case JDBC_TYPE.URL:
      return <URLField {...transferredProps} />;

    case JDBC_TYPE.Label:
      return <LabelField {...transferredProps} />;

    case JDBC_TYPE.DatePicker:
      return <DatePickerField {...transferredProps} />;

    case JDBC_TYPE.TimePicker:
      return <TimePickerField {...transferredProps} />;

    case JDBC_TYPE.UploadDocument:
      return <FileUploadField {...transferredProps} isServerUpload />;

    case JDBC_TYPE.DecimalInput:
      return <DecimalField {...transferredProps} />;

    default:
      return <></>;
  }
};

export default WorkflowFormField;

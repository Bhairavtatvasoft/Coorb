import { FC } from "react";
import CheckboxField from "./CheckboxField";
import InputTextField from "./InputTextField";
import { regex } from "../../utils/regex";
import { JDBC_TYPE } from "../../utils/constant";
import ButtonField from "./ButtonField";
import LabelField from "./LabelField";
import URLField from "./URLField";
import DatePickerField from "./DatePickerField";
import TimePickerField from "./TimePickerField";
// import FileUploadField from "./FileUpload/FileUploadField";

const WorkflowFormField: FC<any> = (props) => {
  const { jdbcType, hidden } = props;
  if (hidden) return <></>;

  const transferredProps = { ...props, name: props.i18nName };
  switch (Number(jdbcType)) {
    case JDBC_TYPE.Button:
      return <ButtonField {...transferredProps} />;

    case JDBC_TYPE.IntegerInput:
      return <InputTextField valRegex={regex.Integer} {...transferredProps} />;

    case JDBC_TYPE.TextInput:
      return <InputTextField {...transferredProps} />;

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

    // case JDBC_TYPE.UploadDocument:
    //   return <FileUploadField {...transferredProps} />;

    default:
      return <></>;
  }
};

export default WorkflowFormField;

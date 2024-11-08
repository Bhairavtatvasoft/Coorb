import { FC } from "react";
import { IGenericFieldProps, IObject } from "../../service/commonModel";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import FieldHelper from "./FieldHelper";
import { taskService } from "../../service/task/TaskService";
import { FormikContextType, useFormikContext } from "formik";
import { ITaskDetail } from "../../service/task/TaskModel";
import { transferObjectForTaskSave } from "../../pages/WorkflowFormPage";

const ButtonField: FC<
  IGenericFieldProps & {
    isServerClick?: boolean;
    handleClick: (data?: any) => void;
  }
> = (props) => {
  const { t } = useTranslation();
  const { variant = "contained", lbl, isServerClick, handleClick } = props;
  const { values }: FormikContextType<IObject> = useFormikContext();

  const handleBtnClick = () => {
    if (isServerClick) {
      taskService.buttonClick({
        task: transferObjectForTaskSave(values, t) as ITaskDetail,
        buttonVarialeId: props.id!.toString(),
      });
    }
    if (handleClick) {
      handleClick();
    }
  };

  return (
    <div className="fieldWrapper">
      <Button
        type="button"
        variant={variant}
        onClick={handleBtnClick}
        className="genericBtn"
      >
        {t(lbl)}
      </Button>
      <FieldHelper desc={t(lbl + "_desc")} />
    </div>
  );
};

export default ButtonField;

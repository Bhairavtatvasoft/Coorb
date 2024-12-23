import { useState } from "react";
import { Button, Step, StepLabel, Stepper } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import WorkflowFormField from "../common/WorkflowFormField";
import "./WizardForm.css";
import { Variable } from "../../service/workflow/WorkflowModel";
import { ArrowBackSharp, ArrowForwardSharp } from "@mui/icons-material";
import { useFormikContext } from "formik";
import { errorToast } from "../common/ToastMsg";
import { useTranslation } from "react-i18next";
import { ITaskDetail } from "../../service/task/TaskModel";

interface WizardFormProps {
  groupedVariables: Record<string, Variable[]>;
  handleBtnClick: (values: ITaskDetail) => void;
}

const WizardComponent = ({
  groupedVariables,
  handleBtnClick,
}: WizardFormProps) => {
  const [stepIndex, setStepIndex] = useState(0);
  const groupNames = Object.keys(groupedVariables);
  const { validateForm, setFieldTouched }: any = useFormikContext();
  const { t, i18n } = useTranslation();

  const handleBack = () => setStepIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = async () => {
    const currentGroupName = groupNames[stepIndex];
    const currentGroupVariables = groupedVariables[currentGroupName];
    currentGroupVariables.forEach((variable) => {
      const fieldName = variable.i18nName;
      setFieldTouched(`formField.${fieldName}`, true, false);
    });
    await validateForm().then((res: any) => {
      const hasErrors = currentGroupVariables.some((variable) => {
        const fieldName = variable.i18nName;
        return res?.formField?.[fieldName];
      });
      if (!hasErrors) {
        setStepIndex((prev) => Math.min(prev + 1, groupNames.length - 1));
      } else {
        errorToast(t("commonValidationMsg"));
      }
    });
  };

  const handleStepClick = (index: number) => {
    if (index < stepIndex) {
      setStepIndex(index);
    }
  };
  return (
    <div className="wizardContainer">
      <Stepper className="stepper" activeStep={stepIndex} alternativeLabel>
        {groupNames?.map((groupName, idx) => (
          <Step key={idx} className={stepIndex > idx ? "cursorPointer" : ""}>
            <StepLabel
              onClick={() => handleStepClick(idx)}
              sx={{ marginBottom: "5px" }}
            >
              {t(groupName)}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <Grid2 container className="formContainer" spacing={3}>
        {Object.keys(groupedVariables)?.length > 0 &&
          groupedVariables[groupNames[stepIndex]]?.map((variable, idx) => (
            <Grid2
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              key={`wizard-field-${idx}`}
            >
              <WorkflowFormField
                {...variable}
                handleBtnClick={handleBtnClick}
              />
            </Grid2>
          ))}
      </Grid2>
      <hr />
      <div className="wizardFooter">
        <Button
          type="button"
          onClick={handleBack}
          variant="outlined"
          disabled={stepIndex === 0}
          className={i18n.dir() === "rtl" ? "btnRotate wizardBtn" : "wizardBtn"}
        >
          <ArrowBackSharp />
          {t("back")}
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          variant="outlined"
          disabled={stepIndex === groupNames.length - 1}
          className={i18n.dir() === "rtl" ? "btnRotate wizardBtn" : "wizardBtn"}
        >
          {t("next")} <ArrowForwardSharp />
        </Button>
      </div>
    </div>
  );
};

export default WizardComponent;

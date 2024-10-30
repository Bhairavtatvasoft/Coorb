import { useState } from "react";
import { Button, Step, StepLabel, Stepper } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import WorkflowFormField from "../common/WorkflowFormField";
import "./WizardForm.css";
import { Variable } from "../../service/workflow/WorkflowModel";
import { ArrowBackSharp, ArrowForwardSharp } from "@mui/icons-material";
import { useFormikContext } from "formik";
import { errorToast } from "../common/ToastMsg";

interface WizardFormProps {
  groupedVariables: Record<string, Variable[]>;
}

const WizardComponent = ({ groupedVariables }: WizardFormProps) => {
  const [stepIndex, setStepIndex] = useState(0);
  const groupNames = Object.keys(groupedVariables);
  const { errors, validateForm, setFieldTouched }: any = useFormikContext();

  const handleBack = () => setStepIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = async () => {
    const currentGroupName = groupNames[stepIndex];
    const currentGroupVariables = groupedVariables[currentGroupName];
    currentGroupVariables.forEach((variable) => {
      const fieldName = variable.i18nName;
      setFieldTouched(fieldName, true, false);
    });
    await validateForm();
    const hasErrors = currentGroupVariables.some((variable) => {
      const fieldName = variable.i18nName;
      return errors[fieldName];
    });

    if (!hasErrors) {
      setStepIndex((prev) => Math.min(prev + 1, groupNames.length - 1));
    } else {
      errorToast("Validation errors exist in the current step.");
    }
  };

  const handleStepClick = (index: number) => {
    if (index < stepIndex) {
      setStepIndex(index);
    }
  };
  return (
    <div className="wizardContainer">
      <Stepper className="stepper" activeStep={stepIndex} alternativeLabel>
        {groupNames.map((groupName, idx) => (
          <Step key={idx}>
            <StepLabel onClick={() => handleStepClick(idx)}>
              {groupName}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <Grid2 container className="formContainer" spacing={3}>
        {groupedVariables[groupNames[stepIndex]].map((variable, idx) => (
          <Grid2
            spacing={{ xs: 12, sm: 6, md: 4, lg: 4 }}
            key={`wizard-field-${idx}`}
          >
            <WorkflowFormField {...variable} />
          </Grid2>
        ))}
      </Grid2>
      <hr />
      <div className="wizardFooter">
        <Button
          onClick={handleBack}
          variant="outlined"
          disabled={stepIndex === 0}
        >
          <ArrowBackSharp />
          Back
        </Button>
        <Button
          onClick={handleNext}
          variant="outlined"
          disabled={stepIndex === groupNames.length - 1}
        >
          Next <ArrowForwardSharp />
        </Button>
      </div>
    </div>
  );
};

export default WizardComponent;

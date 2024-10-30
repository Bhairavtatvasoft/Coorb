import { useState } from "react";
import {  Button } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import WorkflowFormField from "../common/WorkflowFormField";
import "./WizardForm.css"
const WizardComponent = ({ groupedVariables }: any) => {
  const [stepIndex, setStepIndex] = useState(0);
  const groupNames = Object.keys(groupedVariables);

  const handleNext = () =>
    setStepIndex((prev) => Math.min(prev + 1, groupNames.length - 1));
  const handleBack = () => setStepIndex((prev) => Math.max(prev - 1, 0));

  return (
    <>
      <h2 className="wizardTitle">{groupNames[stepIndex]}</h2>
      <Grid2 container spacing={3} sx={{ p: 2 }}>
        {groupedVariables[groupNames[stepIndex]].map(
          (variable: any, idx: any) => (
            <Grid2
              spacing={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              key={`wizard-field-${idx}`}
            >
              <WorkflowFormField {...variable} />
            </Grid2>
          )
        )}
      </Grid2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "16px",
        }}
      >
        <Button onClick={handleBack} disabled={stepIndex === 0}>
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={stepIndex === groupNames.length - 1}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default WizardComponent;

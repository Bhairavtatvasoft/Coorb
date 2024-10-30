import { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import WorkflowFormField from "../common/WorkflowFormField";
import "./TabForm.css";
import { Variable } from "../../service/workflow/WorkflowModel";
interface TabFormProps {
  groupedVariables: Record<string, Variable[]>;
}
const TabsComponent = ({ groupedVariables }: TabFormProps) => {
  const [tabIndex, setTabIndex] = useState(0);
  const groupNames = Object.keys(groupedVariables);
  return (
    <>
      <Tabs value={tabIndex} onChange={(_, newValue) => setTabIndex(newValue)}>
        {groupNames.map((group, index) => (
          <Tab key={index} label={group} />
        ))}
      </Tabs>

      <Grid2 container spacing={3} className="tabContainer">
        {groupedVariables[groupNames[tabIndex]].map((variable, idx) => (
          <Grid2
            spacing={{ xs: 12, sm: 6, md: 4, lg: 4 }}
            key={`tab-field-${idx}`}
          >
            <WorkflowFormField {...variable} />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};

export default TabsComponent;

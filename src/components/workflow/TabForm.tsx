import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import WorkflowFormField from "../common/WorkflowFormField";
import "./TabForm.css";
import { Variable } from "../../service/workflow/WorkflowModel";
import { ITaskDetail } from "../../service/task/TaskModel";
interface TabFormProps {
  groupedVariables: Record<string, Variable[]>;
  handleBtnClick: (values: ITaskDetail) => void;
}
const TabsComponent = ({ groupedVariables, handleBtnClick }: TabFormProps) => {
  const [tabIndex, setTabIndex] = useState(0);
  const groupNames = Object.keys(groupedVariables);
  return (
    <>
      <Box className="tabWrapper">
        <Tabs
          value={tabIndex}
          onChange={(_, newValue) => setTabIndex(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {groupNames.map((group, index) => (
            <Tab key={index} label={group} />
          ))}
        </Tabs>
      </Box>

      <Grid2 container spacing={3} className="tabContainer">
        {groupedVariables &&
          groupNames?.length > 0 &&
          groupedVariables[groupNames[tabIndex]].map((variable, idx) => (
            <Grid2
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              key={`tab-field-${idx}`}
              className="responsiveGrid"
            >
              <WorkflowFormField
                handleBtnClick={handleBtnClick}
                {...variable}
              />
            </Grid2>
          ))}
      </Grid2>
    </>
  );
};

export default TabsComponent;

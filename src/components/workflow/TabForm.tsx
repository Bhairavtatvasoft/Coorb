import  { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import WorkflowFormField from "../common/WorkflowFormField";


const TabsComponent = ({ groupedVariables }:any) => {
  const [tabIndex, setTabIndex] = useState(0);
  const groupNames = Object.keys(groupedVariables);

  return (
    <>
      <Tabs value={tabIndex} onChange={(_, newValue) => setTabIndex(newValue)}>
        {groupNames.map((group, index) => (
          <Tab key={index} label={group} />
        ))}
      </Tabs>

        <Grid2 container spacing={3} sx={{ p: 2 }}>
          {groupedVariables[groupNames[tabIndex]].map(
            (variable: any, idx: any) => (
              <Grid2
                spacing={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                key={`tab-field-${idx}`}
              >
                <WorkflowFormField {...variable} />
              </Grid2>
            )
          )}
        </Grid2>

    </>
  );
};

export default TabsComponent;

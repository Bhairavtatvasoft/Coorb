import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import StartableWorkflows from "../components/workflow/StartableWorkflows";
import PendingTab from "../components/workflow/PendingTab";
import { useTranslation } from "react-i18next";

const Workflow = () => {
  const [value, setValue] = useState(0);
    const { t } = useTranslation();
  const handleChange = (_: any, newValue: any) => {
    setValue(newValue);
  };
  const isRtl = document.documentElement.dir === "rtl";

  return (
    <Box sx={{ width: "100%" }}>
      {/* Container for the tabs */}
      <Box sx={{ display: "flex", justifyContent: "flex-start", p: 2 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            direction: isRtl ? "rtl" : "ltr",
            borderBottom: 1,
            borderColor: "divider",
            ".MuiTabs-flexContainer": {
              justifyContent: "flex-start",
            },
            width: "100%",
          }}
          TabIndicatorProps={{
            sx: {
              height: "6px",
              backgroundColor: "rgb(36, 75, 98)",
            },
          }}
        >
          <Tab key={0} label={t("STARTABLE")} />
          <Tab key={1} label={t("PENDING")} />
        </Tabs>
      </Box>

      {/* Tab content */}
      <Box sx={{ p: 3 }}>
        {value === 0 && <StartableWorkflows />}
        {value === 1 && <PendingTab />}
      </Box>
    </Box>
  );
};

export default Workflow;

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
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            direction: isRtl ? "rtl" : "ltr"
          }}
        >
          <Tab key={0} label={t("STARTABLE")} />
          <Tab key={1} label={t("PENDING")} />
        </Tabs>
      </Box>
      <Box sx={{ p: 3 }}>
        {value === 0 && <StartableWorkflows />}
        {value === 1 && <PendingTab />}
      </Box>
    </Box>
  );
};

export default Workflow;

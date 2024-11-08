import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import StartableWorkflows from "../components/workflow/StartableWorkflows";
import PendingTab from "../components/workflow/PendingTab";
import { useTranslation } from "react-i18next";
import "./Workflow.scss";
import { useLocation, useNavigate } from "react-router-dom";
const Workflow = () => {
  const [value, setValue] = useState(0);
  const { t } = useTranslation();
  const handleChange = (_: any, newValue: any) => {
    setValue(newValue);
  };
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      setValue(location.state.tab as number);
      navigate(".");
    }
  }, []);

  return (
    <Box className="workflowContainer">
      <Box className="workflowTabBox">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          className="workflowTabs"
        >
          <Tab key={0} label={t("STARTABLE")} className="workflowTab" />
          <Tab key={1} label={t("PENDING")} className="workflowTab" />
        </Tabs>
      </Box>

      <Box className="workflowTabContent">
        {value === 0 && <StartableWorkflows />}
        {value === 1 && <PendingTab />}
      </Box>
    </Box>
  );
};

export default Workflow;

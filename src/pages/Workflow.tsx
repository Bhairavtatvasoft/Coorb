import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import StartableWorkflows from "../components/workflow/StartableWorkflows";
import PendingTab from "../components/workflow/PendingTab";
import { useTranslation } from "react-i18next";
import "./Workflow.scss";
import { useLocation, useNavigate } from "react-router-dom";
import i18n from "../translation/i18n";
const Workflow = () => {
  const [value, setValue] = useState(0);
  const { t } = useTranslation();
  const handleChange = (_: any, newValue: any) => {
    setValue(newValue);
  };
  const location = useLocation();
  const navigate = useNavigate();
  const workflowTabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (location.state) {
      setValue(location.state.tab as number);
      navigate(".");
    }
  }, []);

  useEffect(() => {
    if (workflowTabRef.current) {
      const indicator =
        workflowTabRef.current.querySelector<HTMLSpanElement>(
          ".MuiTabs-indicator"
        );
      if (indicator && i18n.dir() === "rtl") {
        indicator.style.left = "auto";
        indicator.style.right = `calc(0px + ${value * 92}px)`;
      }
    }
  }, [i18n.dir(), value]);

  return (
    <Box className="workflowContainer">
      <Box className="workflowTabBox">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          className="workflowTabs"
          ref={workflowTabRef}
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

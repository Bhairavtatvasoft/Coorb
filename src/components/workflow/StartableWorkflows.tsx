import { useEffect, useRef, useState } from "react";
import { Box, Card, CardContent, Typography, Grid2 } from "@mui/material";
import { useTranslation } from "react-i18next";

import { Workflow } from "../../service/workflow/WorkflowModel";
import { workflowService } from "../../service/workflow/WorkflowService";
import "./StartableWorkflow.css";
import { useNavigate } from "react-router";

const StartableWorkflows = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const { t } = useTranslation();
  const requestInitiated = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!requestInitiated.current) {
      requestInitiated.current = true;
      fetchWorkflows();
    }
  }, []);

  const fetchWorkflows = async () => {
    const response = await workflowService.getStartableWorkflows();
    const data: Workflow[] = response.data;
    setWorkflows(data);
  };

  const handleWorkflowClick = async (id: string, tokenId: string) => {
    const response = await workflowService.instantiate(id, tokenId);
    if (response.status === 200) {
      navigate(
        `/workflow-form/${response.data?.taskInstanceId}/${response.data.taskInstanceTokenId}`
      );
    }
  };

  return (
    <Box className="workflowContainer">
      <Grid2 container spacing={2}>
        {workflows.map((workflow) => (
          <Grid2
            className="gridItem"
            size={{ xs: 12, sm: 6, md: 4 }}
            key={workflow.id}
          >
            <Card
              className="card"
              variant="outlined"
              onClick={() =>
                handleWorkflowClick(workflow.id, workflow.tokenId?.toString())
              }
            >
              <CardContent>
                <Typography variant="h6" className="cardTitle">
                  {t(workflow.name) || workflow.name}
                </Typography>
                <Typography className="cardDescription">
                  {t(`${workflow.name}_FLOW_DESCRIPTION`) ||
                    "No description available."}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default StartableWorkflows;

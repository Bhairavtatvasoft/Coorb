import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Grid2 } from "@mui/material";

import { mockFetchWorkflows } from "./mockfunctions";
import { Workflow } from "../../service/workflow/WorkflowModel";
import { workflowService } from "../../service/workflow/WorkflowService";
import { useTranslation } from "react-i18next";
import "./StartableWorkflow.css"

const StartableWorkflows = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        const data: Workflow[] = await mockFetchWorkflows();
        setWorkflows(data);
      } catch (error) {
        console.error("Error fetching workflows:", error);
      }
    };

    fetchWorkflows();
  }, []);

  const handleWorkflowClick = async (id: string, tokenId: number) => {
    const response = await workflowService.startWorkflow(id, tokenId);
    if (response.status === 200) {
      console.log(response.data);
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
              onClick={() => handleWorkflowClick(workflow.id, workflow.tokenId)}
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

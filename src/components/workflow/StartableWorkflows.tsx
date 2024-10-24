import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Grid2 } from "@mui/material";

import { mockFetchWorkflows } from "./mockfunctions";
import { Workflow } from "../../service/workflow/WorkflowModel";
import { workflowService } from "../../service/workflow/WorkflowService";
import { useTranslation } from "react-i18next";
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
    <Box sx={{ p: 2 }}>
      <Grid2 container spacing={2}>
        {workflows.map((workflow) => (
          <Grid2 size={{ xs: 6, md: 4 }} key={workflow.id}>
            <Card
              variant="outlined"
              sx={{
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: 6,
                  transform: "scale(1.02)",
                },
                height: "100%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "rgb(36, 75, 98)",
                border: "1px solid #d7ccc8",
                borderRadius: 4,
              }}
              onClick={() => handleWorkflowClick(workflow.id, workflow.tokenId)}
            >
              <CardContent>
                <Typography variant="h6" color="rgb(253, 196, 3)">
                  {t(workflow.name) || workflow.name}
                </Typography>
                <Typography color="white">
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

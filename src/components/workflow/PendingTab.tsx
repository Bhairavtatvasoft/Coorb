import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Button,
} from "@mui/material";

import { mockFetchPendingTasks } from "./mockfunctions";
import { workflowService } from "../../service/workflow/WorkflowService";
import { TaskResponse } from "../../service/workflow/WorkflowModel";
import { useTranslation } from "react-i18next";

const PendingTab = () => {
  const [data, setData] = useState<TaskResponse[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const response = await mockFetchPendingTasks();
      setData(response);
    };
    fetchData();
  }, []);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const handleRelease = async (taskInstanceId: string, tokenId: number) => {
    const response = await workflowService.release(taskInstanceId, tokenId);
    console.log(response.data);
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead
            sx={{
              "& .MuiTableCell-root": { fontWeight: "bold", color: "#f5f5f5 " },
            }}
          >
            <TableRow sx={{ backgroundColor: "#d7ccc8" }}>
              <TableCell>{t("workflowName")}</TableCell>
              <TableCell>{t("taskName")}</TableCell>
              <TableCell>{t("addedBy")}</TableCell>
              <TableCell>{t("addedOn")}</TableCell>
              <TableCell>{t("statusIn")}</TableCell>
              <TableCell>{t("tenant")}</TableCell>
              <TableCell>{t("loaded")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.taskInstanceId}>
                  <TableCell key={row.taskInstanceId + "workflowI18Name"}>
                    {t(row.workflowI18Name)}
                  </TableCell>
                  <TableCell key={row.taskInstanceId + "taskI18Name"}>
                    {t(row.taskI18Name)}
                  </TableCell>
                  <TableCell key={row.taskInstanceId + "userDisplayName"}>
                    {row.userDisplayName}
                  </TableCell>
                  <TableCell key={row.taskInstanceId + "addedOn"}>
                    {new Date(row.addedOn).toLocaleString()}
                  </TableCell>
                  <TableCell key={row.taskInstanceId + "statusInDesc"}>
                    {row.statusInDesc}
                  </TableCell>
                  <TableCell key={row.taskInstanceId + "tenantI18Name"}>
                    {t(row.tenantI18Name)}
                  </TableCell>
                  <TableCell key={row.taskInstanceId + "loadedByOwner"}>
                    {row.loadedByOwner ? (
                      <Button
                        key={row.taskInstanceId + "loadedByOwnerBtn"}
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          handleRelease(row.taskInstanceId, row.tokenId)
                        }
                      >
                        Release Task
                      </Button>
                    ) : (
                      ""
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default PendingTab;

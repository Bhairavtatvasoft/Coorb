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
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
const PendingTab = () => {
  const [data, setData] = useState<TaskResponse[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortColumn, setSortColumn] = useState("");

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

  const handleRowClick = (row: any) => {
    // Implement the click handler for rows where loadedByOwner is false
    console.log("Row clicked:", row);
  };

  const sortData = (a: any, b: any) => {
    let aValue, bValue;

    switch (sortColumn) {
      case "addedOn":
        aValue = new Date(a.addedOn);
        bValue = new Date(b.addedOn);
        break;
      case "statusInDesc":
        aValue = a.statusInDesc;
        bValue = b.statusInDesc;
        break;
      case "workflowI18Name":
        aValue = t(a.workflowI18Name);
        bValue = t(b.workflowI18Name);
        break;
      case "taskI18Name":
        aValue = t(a.taskI18Name);
        bValue = t(b.taskI18Name);
        break;
      case "userDisplayName":
        aValue = a.userDisplayName;
        bValue = b.userDisplayName;
        break;
      case "tenantI18Name":
        aValue = t(a.tenantI18Name);
        bValue = t(b.tenantI18Name);
        break;
      default:
        aValue = a.addedOn;
        bValue = b.addedOn;
    }

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  };
  const handleSort = (column: any) => {
    setSortColumn(column);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };
  return (
    <Paper
      elevation={3} // Add shadow to the Paper
      sx={{
        borderRadius: "10px", // Set border radius
        overflow: "hidden", // Ensure table contents respect the border radius
      }}
    >
      <TableContainer
        sx={{
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Custom shadow
        }}
      >
        <Table>
          <TableHead
            sx={{
              "& .MuiTableCell-root": { fontWeight: "bold", color: "white" },
            }}
          >
            <TableRow sx={{ backgroundColor: "rgb(3, 39, 60)" }}>
              <TableCell
                onClick={() => handleSort("workflowI18Name")}
                sx={{ cursor: "pointer" }}
              >
                {t("workflowName")}
                {sortColumn === "workflowI18Name" &&
                  (sortDirection === "asc" ? (
                    <ArrowUpwardIcon
                      sx={{
                        color: "rgb(253, 196, 3)",
                        verticalAlign: "middle",
                      }}
                      fontSize="small"
                    />
                  ) : (
                    <ArrowDownwardIcon
                      sx={{
                        color: "rgb(253, 196, 3)",
                        verticalAlign: "middle",
                      }}
                      fontSize="small"
                    />
                  ))}
              </TableCell>
              <TableCell
                onClick={() => handleSort("taskI18Name")}
                sx={{ cursor: "pointer" }}
              >
                {t("taskName")}
                {sortColumn === "taskI18Name" &&
                  (sortDirection === "asc" ? (
                    <ArrowUpwardIcon
                      sx={{
                        color: "rgb(253, 196, 3)",
                        verticalAlign: "middle",
                      }}
                      fontSize="small"
                    />
                  ) : (
                    <ArrowDownwardIcon
                      sx={{
                        color: "rgb(253, 196, 3)",
                        verticalAlign: "middle",
                      }}
                      fontSize="small"
                    />
                  ))}
              </TableCell>
              <TableCell
                onClick={() => handleSort("userDisplayName")}
                sx={{ cursor: "pointer" }}
              >
                {t("addedBy")}
                {sortColumn === "userDisplayName" &&
                  (sortDirection === "asc" ? (
                    <ArrowUpwardIcon
                      sx={{
                        color: "rgb(253, 196, 3)",
                        verticalAlign: "middle",
                      }}
                      fontSize="small"
                    />
                  ) : (
                    <ArrowDownwardIcon
                      sx={{
                        color: "rgb(253, 196, 3)",
                        verticalAlign: "middle",
                      }}
                      fontSize="small"
                    />
                  ))}
              </TableCell>
              <TableCell
                onClick={() => handleSort("addedOn")}
                sx={{ cursor: "pointer" }}
              >
                {t("addedOn")}
                {sortColumn === "addedOn" &&
                  (sortDirection === "asc" ? (
                    <ArrowUpwardIcon
                      sx={{
                        color: "rgb(253, 196, 3)",
                        verticalAlign: "middle",
                      }}
                      fontSize="small"
                    />
                  ) : (
                    <ArrowDownwardIcon
                      sx={{
                        color: "rgb(253, 196, 3)",
                        verticalAlign: "middle",
                      }}
                      fontSize="small"
                    />
                  ))}
              </TableCell>
              <TableCell
                onClick={() => handleSort("statusInDesc")}
                sx={{ cursor: "pointer" }}
              >
                {t("statusIn")}
                {sortColumn === "statusInDesc" &&
                  (sortDirection === "asc" ? (
                    <ArrowUpwardIcon
                      sx={{
                        color: "rgb(253, 196, 3)",
                        verticalAlign: "middle",
                      }}
                      fontSize="small"
                    />
                  ) : (
                    <ArrowDownwardIcon
                      sx={{
                        color: "rgb(253, 196, 3)",
                        verticalAlign: "middle",
                      }}
                      fontSize="small"
                    />
                  ))}
              </TableCell>
              <TableCell
                onClick={() => handleSort("tenantI18Name")}
                sx={{ cursor: "pointer" }}
              >
                {t("tenant")}
                {sortColumn === "tenantI18Name" &&
                  (sortDirection === "asc" ? (
                    <ArrowUpwardIcon
                      sx={{
                        color: "rgb(253, 196, 3)",
                        verticalAlign: "middle",
                      }}
                      fontSize="small"
                    />
                  ) : (
                    <ArrowDownwardIcon
                      sx={{
                        color: "rgb(253, 196, 3)",
                        verticalAlign: "middle",
                      }}
                      fontSize="small"
                    />
                  ))}
              </TableCell>
              <TableCell>{t("loaded")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .sort(sortData)
              .map((row) => (
                <TableRow
                  key={row.taskInstanceId}
                  onClick={
                    row.loadedByOwner ? undefined : () => handleRowClick(row)
                  }
                  sx={{
                    "&:hover": {
                      backgroundColor: row.loadedByOwner
                        ? "inherit"
                        : "#f5f5f5",
                      cursor: row.loadedByOwner ? "default" : "pointer",
                    },
                  }}
                >
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
                        sx={{ backgroundColor: "rgb(253, 196, 3)" }}
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
        rowsPerPageOptions={[10, 15, 30]}
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

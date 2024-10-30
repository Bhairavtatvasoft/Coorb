import { useEffect, useRef, useState } from "react";
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
import "./PendingTab.css";
import { taskService } from "../../service/task/TaskService";
import { PendingTaskResponse } from "../../service/workflow/WorkflowModel";
import { useTranslation } from "react-i18next";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { workflowService } from "../../service/workflow/WorkflowService";
const PendingTab = () => {
  const [data, setData] = useState<PendingTaskResponse[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortColumn, setSortColumn] = useState("");
  const requestInitiated = useRef(false);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (!requestInitiated.current) {
      requestInitiated.current = true;
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    const responseLive = await workflowService.getpendingWorkflows();
    const data: PendingTaskResponse[] = responseLive.data;
    console.log(data);
    setData(data);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const handleRelease = async (taskInstanceId: string, tokenId: number) => {
    const response = await taskService.release(taskInstanceId, tokenId);
    console.log(response.data);
  };

  const handleRowClick = (row: any) => {
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
    <Paper elevation={3} className="pendingTabPaper">
      <TableContainer className="pendingTabTableContainer">
        <Table>
          <TableHead className="pendingTabTableHead">
            <TableRow className="pendingTabTableRow">
              <TableCell
                onClick={() => handleSort("workflowI18Name")}
                className="pendingTabTableRow"
              >
                {t("workflowName")}
                {sortColumn === "workflowI18Name" &&
                  (sortDirection === "asc" ? (
                    <ArrowUpwardIcon
                      className="pendingTabArrowIcon"
                      fontSize="small"
                    />
                  ) : (
                    <ArrowDownwardIcon
                      className="pendingTabArrowIcon"
                      fontSize="small"
                    />
                  ))}
              </TableCell>
              <TableCell
                onClick={() => handleSort("taskI18Name")}
                className="pendingTabTableRow"
              >
                {t("taskName")}
                {sortColumn === "taskI18Name" &&
                  (sortDirection === "asc" ? (
                    <ArrowUpwardIcon
                      className="pendingTabArrowIcon"
                      fontSize="small"
                    />
                  ) : (
                    <ArrowDownwardIcon
                      className="pendingTabArrowIcon"
                      fontSize="small"
                    />
                  ))}
              </TableCell>
              <TableCell
                onClick={() => handleSort("userDisplayName")}
                className="pendingTabTableRow"
              >
                {t("addedBy")}
                {sortColumn === "userDisplayName" &&
                  (sortDirection === "asc" ? (
                    <ArrowUpwardIcon
                      className="pendingTabArrowIcon"
                      fontSize="small"
                    />
                  ) : (
                    <ArrowDownwardIcon
                      className="pendingTabArrowIcon"
                      fontSize="small"
                    />
                  ))}
              </TableCell>
              <TableCell
                onClick={() => handleSort("addedOn")}
                className="pendingTabTableRow"
              >
                {t("addedOn")}
                {sortColumn === "addedOn" &&
                  (sortDirection === "asc" ? (
                    <ArrowUpwardIcon
                      className="pendingTabArrowIcon"
                      fontSize="small"
                    />
                  ) : (
                    <ArrowDownwardIcon
                      className="pendingTabArrowIcon"
                      fontSize="small"
                    />
                  ))}
              </TableCell>
              <TableCell
                onClick={() => handleSort("statusInDesc")}
                className="pendingTabTableRow"
              >
                {t("statusIn")}
                {sortColumn === "statusInDesc" &&
                  (sortDirection === "asc" ? (
                    <ArrowUpwardIcon
                      className="pendingTabArrowIcon"
                      fontSize="small"
                    />
                  ) : (
                    <ArrowDownwardIcon
                      className="pendingTabArrowIcon"
                      fontSize="small"
                    />
                  ))}
              </TableCell>
              <TableCell
                onClick={() => handleSort("tenantI18Name")}
                className="pendingTabTableRow"
              >
                {t("tenant")}
                {sortColumn === "tenantI18Name" &&
                  (sortDirection === "asc" ? (
                    <ArrowUpwardIcon
                      className="pendingTabArrowIcon"
                      fontSize="small"
                    />
                  ) : (
                    <ArrowDownwardIcon
                      className="pendingTabArrowIcon"
                      fontSize="small"
                    />
                  ))}
              </TableCell>
              <TableCell>{t("loaded")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  {t("noData")}
                </TableCell>
              </TableRow>
            ) : (
              data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .sort(sortData)
                .map((row) => (
                  <TableRow
                    key={row.taskInstanceId}
                    onClick={
                      row.loadedByOwner ? undefined : () => handleRowClick(row)
                    }
                    className={
                      row.loadedByOwner
                        ? "pendingTabTableRowHoverInherited"
                        : "pendingTabTableRowHover"
                    }
                  >
                    <TableCell>{t(row.workflowI18Name)}</TableCell>
                    <TableCell>{t(row.taskI18Name)}</TableCell>
                    <TableCell>{row.userDisplayName}</TableCell>
                    <TableCell>
                      {new Date(row.addedOn).toLocaleString()}
                    </TableCell>
                    <TableCell>{row.statusInDesc}</TableCell>
                    <TableCell>{t(row.tenantI18Name)}</TableCell>
                    <TableCell>
                      {row.loadedByOwner && (
                        <Button
                          variant="contained"
                          color="primary"
                          className="pendingTabReleaseButton"
                          onClick={() =>
                            handleRelease(row.taskInstanceId, row.variables[0].tokenId)
                          }
                        >
                          Release Task
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
            )}
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
        labelRowsPerPage={t("rowsPerPage")}
        labelDisplayedRows={({ from, to, count }) => {
          const displayedCount =
            count !== -1 ? count.toString() : i18n.t("moreThan", { to });
          const translationOptions = {
            from: from.toString(),
            to: to.toString(),
            count: displayedCount,
          };
          return i18n.t(
            "paginationText",
            translationOptions as Record<string, string>
          );
        }}
        slotProps={
          i18n.language === "ar"
            ? {
                actions: {
                  nextButton: { sx: { rotate: "180deg" } },
                  previousButton: {
                    sx: { rotate: "180deg" },
                  },
                },
              }
            : {}
        }
      />
    </Paper>
  );
};

export default PendingTab;

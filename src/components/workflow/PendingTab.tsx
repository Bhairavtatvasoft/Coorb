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
  TableSortLabel,
  Alert,
} from "@mui/material";
import "./PendingTab.scss";
import { taskService } from "../../service/task/TaskService";
import { PendingTaskResponse } from "../../service/workflow/WorkflowModel";
import { useTranslation } from "react-i18next";
import { workflowService } from "../../service/workflow/WorkflowService";
import { successToast } from "../common/ToastMsg";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const PendingTab = () => {
  const [data, setData] = useState<PendingTaskResponse[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortColumn, setSortColumn] = useState("");
  const requestInitiated = useRef(false);

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!requestInitiated.current) {
      requestInitiated.current = true;
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    const responseLive = await workflowService.getpendingWorkflows();
    const data: PendingTaskResponse[] = responseLive.data;
    setData(data);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const handleRelease = async (taskInstanceId: string, tokenId: string) => {
    const response = await taskService.release(taskInstanceId, tokenId);
    if (response.status === 200) {
      successToast(t("taskReleased"));
      fetchData();
    }
  };

  const handleRowClick = (row: PendingTaskResponse) => {
    navigate(`/workflow-form/${row.taskInstanceId}/${row.data[5].toString()}`);
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
    <>
      {data.length > 100 && (
        <Alert
          variant="standard"
          severity="warning"
          sx={{
            marginBottom: "10px",
            backgroundColor: "#ffe2ba",
            fontWeight: "600",
            borderRadius: "6px",
          }}
          className="warning"
        >
          {t("moreThen100RecordPending")}
        </Alert>
      )}
      <Paper
        elevation={3}
        className={`pendingTabPaper ${data.length > 100 ? "extraRecord" : ""}`}
      >
        <TableContainer
          className={`pendingTabTableContainer ${
            data.length > 100 ? "extraRecord" : ""
          }`}
        >
          <Table
            stickyHeader
            className={`pendingTable ${data.length > 100 ? "extraRecord" : ""}`}
          >
            <TableHead className="pendingTabTableHead">
              <TableRow className="pendingTabTableRow">
                <TableCell
                  onClick={() => handleSort("workflowI18Name")}
                  className="pendingTabTableRow"
                  sortDirection={
                    sortColumn === "workflowI18Name"
                      ? sortDirection === "desc"
                        ? "desc"
                        : "asc"
                      : false
                  }
                >
                  <TableSortLabel
                    active={sortColumn === "workflowI18Name"}
                    direction={sortDirection === "desc" ? "desc" : "asc"}
                    className="PendingTabShortLabel"
                  >
                    {t("workflowName")}
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  onClick={() => handleSort("taskI18Name")}
                  className="pendingTabTableRow"
                  sortDirection={
                    sortColumn === "taskI18Name"
                      ? sortDirection === "desc"
                        ? "desc"
                        : "asc"
                      : false
                  }
                >
                  <TableSortLabel
                    active={sortColumn === "taskI18Name"}
                    direction={sortDirection === "desc" ? "desc" : "asc"}
                    className="PendingTabShortLabel"
                  >
                    {t("taskName")}
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  onClick={() => handleSort("userDisplayName")}
                  className="pendingTabTableRow"
                  sortDirection={
                    sortColumn === "userDisplayName"
                      ? sortDirection === "desc"
                        ? "desc"
                        : "asc"
                      : false
                  }
                >
                  <TableSortLabel
                    active={sortColumn === "userDisplayName"}
                    direction={sortDirection === "desc" ? "desc" : "asc"}
                    className="PendingTabShortLabel"
                  >
                    {t("addedBy")}
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  onClick={() => handleSort("addedOn")}
                  className="pendingTabTableRow"
                  sortDirection={
                    sortColumn === "addedOn"
                      ? sortDirection === "desc"
                        ? "desc"
                        : "asc"
                      : false
                  }
                >
                  <TableSortLabel
                    active={sortColumn === "addedOn"}
                    direction={sortDirection === "desc" ? "desc" : "asc"}
                    className="PendingTabShortLabel"
                  >
                    {t("addedOn")}
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  onClick={() => handleSort("statusInDesc")}
                  className="pendingTabTableRow"
                  sortDirection={
                    sortColumn === "statusInDesc"
                      ? sortDirection === "desc"
                        ? "desc"
                        : "asc"
                      : false
                  }
                >
                  <TableSortLabel
                    active={sortColumn === "statusInDesc"}
                    direction={sortDirection === "desc" ? "desc" : "asc"}
                    className="PendingTabShortLabel"
                  >
                    {t("statusIn")}
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  onClick={() => handleSort("tenantI18Name")}
                  className="pendingTabTableRow"
                  sortDirection={
                    sortColumn === "tenantI18Name"
                      ? sortDirection === "desc"
                        ? "desc"
                        : "asc"
                      : false
                  }
                >
                  <TableSortLabel
                    active={sortColumn === "tenantI18Name"}
                    direction={sortDirection === "desc" ? "desc" : "asc"}
                    className="PendingTabShortLabel"
                  >
                    {t("tenant")}
                  </TableSortLabel>
                </TableCell>
                <TableCell className="pendingTabTableRow">
                  {t("loaded")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={`${data.length > 100 ? "extraRecord" : ""}`}>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    align="center"
                    sx={{ justifyContent: "center" }}
                  >
                    {t("noData")}
                  </TableCell>
                </TableRow>
              ) : (
                data
                  .sort(sortData)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      key={row.taskInstanceId}
                      onClick={
                        row.loadedByOwner
                          ? undefined
                          : () => handleRowClick(row)
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
                        {moment(row.addedOn).format("DD/MM/YYYY HH:mm")}
                      </TableCell>
                      <TableCell>{t(row.statusInDesc)}</TableCell>
                      <TableCell>{t(row.tenantI18Name)}</TableCell>
                      <TableCell>
                        {row.loadedByOwner && (
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            className="pendingTabReleaseButton"
                            onClick={() =>
                              handleRelease(
                                row.taskInstanceId,
                                row.data[5].toString() // TokenId
                              )
                            }
                          >
                            {t("releaseTask")}
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
    </>
  );
};

export default PendingTab;

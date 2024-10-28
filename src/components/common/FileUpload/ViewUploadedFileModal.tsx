import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ViewFileDetail } from "./FileUploadField";
import { fileService } from "../../../service/file/fileService";

type Props = {
  handleClose: () => void;
  viewFileDetail: ViewFileDetail;
  taskInstanceId: string;
  taskInstanceTokenId: string;
  variableTypeId: string;
  variableTypeTokenId: string;
  setFileDetail: (file: string) => void;
};

const ViewUploadedFile: FC<Props> = (props) => {
  const {
    handleClose,
    taskInstanceId,
    taskInstanceTokenId,
    variableTypeId,
    variableTypeTokenId,
    viewFileDetail,
    setFileDetail,
  } = props;
  const { t } = useTranslation();

  useEffect(() => {
    if (!viewFileDetail.file) getFileDetails();
  }, []);

  const getFileDetails = () => {
    fileService
      .download({
        taskInstanceId,
        taskInstanceTokenId,
        variableTypeId,
        variableTypeTokenId,
      })
      .then((res) => {
        if (res?.data) {
          setFileDetail(res.data);
          console.log("------rajlog---res", res);
        }
      })
      .catch(() => {
        setFileDetail("");
      });
  };

  return (
    <Dialog onClose={handleClose} open={true} maxWidth="md" fullWidth>
      <DialogTitle>{t("viewFile")}</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button type="button" onClick={handleClose} variant="contained">
          {t("close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewUploadedFile;

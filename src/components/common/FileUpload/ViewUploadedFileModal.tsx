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
import { fileService } from "../../../service/file/FileService";

type Props = {
  handleClose: () => void;
  viewFileDetail: ViewFileDetail;
  taskInstanceId: string;
  taskInstanceTokenId: string;
  variableTypeId: number;
  variableTypeTokenId: string;
  setFileDetail: (file: string, fileType: string) => void;
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
    if (!viewFileDetail.fileData) getFileDetails();
  }, []);

  const getFileType = (base64Data: string) => {
    if (/^data:application\/pdf/.test(base64Data)) return "pdf";
    if (/^data:text\/plain/.test(base64Data)) return "text";
    if (/^data:image\/(jpeg|png|gif)/.test(base64Data)) return "image";
    return "unknown";
  };

  const getFileDetails = async () => {
    fileService
      .download({
        taskInstanceId,
        taskInstanceTokenId,
        variableTypeId,
        variableTypeTokenId,
      })
      .then((res) => {
        if (res?.data) {
          setFileDetail(res.data, getFileType(res.data));
        }
      })
      .catch(() => {
        setFileDetail("", "");
      });
  };

  return (
    <Dialog onClose={handleClose} open={true} maxWidth="md" fullWidth>
      <DialogTitle>{t("viewFile")}</DialogTitle>
      <DialogContent>
        {(viewFileDetail.fileType === "pdf" ||
          viewFileDetail.fileType === "txt") && (
          <iframe
            src={viewFileDetail.fileData}
            width="100%"
            height="100%"
            style={{ border: "none" }}
          />
        )}

        {viewFileDetail.fileType === "image" && (
          <img
            src={viewFileDetail.fileData}
            alt="Preview"
            style={{ maxWidth: "100%" }}
          />
        )}

        {viewFileDetail.fileType === "unknown" && (
          <p>{t("canNotPreviewFile")}</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button type="button" onClick={handleClose} variant="contained">
          {t("close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewUploadedFile;

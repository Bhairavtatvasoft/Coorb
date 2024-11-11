import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Grid2,
  TextField,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface NoteModalProps {
  open: boolean;
  onClose: () => void;
  noteVal: string;
  handleNoteChange: (val: string) => void;
}

const NoteModal: React.FC<NoteModalProps> = ({
  open,
  onClose,
  noteVal,
  handleNoteChange,
}) => {
  const { t } = useTranslation();

  const [noteText, setNoteText] = useState(noteVal);

  const handleSaveAndClose = () => {
    handleNoteChange(noteText);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      className="modal"
    >
      <DialogTitle>{t("addViewNote")}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Grid2 container spacing={2}>
          {/* <Grid2 size={{ xs: 12 }}>
            <TextField
              label={t("description")}
              defaultValue={description}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              fullWidth
              multiline
              minRows={2}
              maxRows={6}
            />
          </Grid2> */}
          <Grid2 size={{ xs: 12 }}>
            <label>{t("plzNoteFollowing")}...</label>
            <TextField
              value={noteText ?? ""}
              onChange={(e) => setNoteText(e.target.value)}
              onBlur={(e) => setNoteText(e.target.value?.trim())}
              fullWidth
              minRows={2}
              maxRows={6}
              placeholder={t("notePlaceholder")}
              multiline
            />
          </Grid2>
        </Grid2>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="outlined">
          {t("close")}
        </Button>
        <Button
          onClick={handleSaveAndClose}
          color="primary"
          variant="contained"
        >
          {t("saveAndClose")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoteModal;

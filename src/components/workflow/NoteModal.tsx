import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Grid2,
  TextField,
} from "@mui/material";
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
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
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
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              onBlur={(e) => setNoteText(e.target.value?.trim())}
              fullWidth
              minRows={2}
              maxRows={6}
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

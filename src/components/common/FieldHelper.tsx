import { Tooltip } from "@mui/material";
import { FC, ReactNode } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const FieldHelper: FC<{ desc: string | ReactNode }> = ({ desc }) => {
  return (
    <Tooltip title={desc}>
      <HelpOutlineIcon className="helperIcon" />
    </Tooltip>
  );
};

export default FieldHelper;

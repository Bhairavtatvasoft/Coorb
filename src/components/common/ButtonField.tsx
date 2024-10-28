import { FC } from "react";
import { IGenericFieldProps } from "../../service/commonModel";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import FieldHelper from "./FieldHelper";

const ButtonField: FC<IGenericFieldProps> = (props) => {
  const { t } = useTranslation();
  const { name, variant = "contained" } = props;

  const handleBtnClick = () => {};

  return (
    <div className="fieldWrapper">
      <Button type="button" variant={variant} onClick={handleBtnClick}>
        {t(name)}
      </Button>
      <FieldHelper desc={t(name + "_desc")} />
    </div>
  );
};

export default ButtonField;

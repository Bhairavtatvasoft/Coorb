import { FC } from "react";
import { useTranslation } from "react-i18next";
import { IGenericFieldProps } from "../../service/commonModel";
import FieldHelper from "./FieldHelper";

const LabelField: FC<IGenericFieldProps> = (props) => {
  const { t } = useTranslation();
  const { name, lbl } = props;

  return (
    <div className="fieldWrapper">
      <label>{t(lbl ? lbl : name)}</label>
      <FieldHelper desc={t(lbl + "_desc")} />
    </div>
  );
};

export default LabelField;

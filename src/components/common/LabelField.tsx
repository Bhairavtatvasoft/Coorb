import { FC } from "react";
import { useTranslation } from "react-i18next";
import { IGenericFieldProps } from "../../service/commonModel";
import FieldHelper from "./FieldHelper";

const LabelField: FC<IGenericFieldProps> = (props) => {
  const { t } = useTranslation();
  const { name } = props;

  return (
    <div className="fieldWrapper">
      <label>{t(name)}</label>
      <FieldHelper desc={t(name + "_desc")} />
    </div>
  );
};

export default LabelField;

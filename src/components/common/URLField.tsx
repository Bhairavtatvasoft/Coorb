import { FC } from "react";
import { useTranslation } from "react-i18next";
import { IGenericFieldProps } from "../../service/commonModel";
import FieldHelper from "./FieldHelper";
import { useField } from "formik";

const URLField: FC<IGenericFieldProps> = (props) => {
  const { t } = useTranslation();
  const { name, lbl } = props;
  const [field] = useField(name);

  return (
    <div className="fieldWrapper">
      <a href={field.value} target="_blank">
        {t(lbl ? lbl : name)}
      </a>
      <FieldHelper desc={t(lbl + "_desc")} />
    </div>
  );
};

export default URLField;

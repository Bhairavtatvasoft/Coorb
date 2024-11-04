export interface IGenericFieldProps {
  lbl: string;
  name: string;
  instanceId?: string;
  tokenId?: string;
  id?: string;

  hideHelp?: boolean;
  placeholder?: string;
  readOnly?: 0 | 1;
  required?: 0 | 1;
  fieldType?: "text" | "textarea" | "password";
  variant?: "text" | "outlined" | "contained";
  hidden?: 0 | 1;
  valRegex?: RegExp;
  options?: { value: string | number; label: string | number }[];
  hideClr?: boolean;
  fetchOpt?: boolean;
}

export interface IObject {
  [key: string]: any;
}

export interface ISelectOpt {
  value: string | number;
  label: string | number;
}

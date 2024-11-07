import { Variable } from "./workflow/WorkflowModel";

export interface IGenericFieldProps extends Partial<Variable> {
  lbl: string;
  name: string;

  hideHelp?: boolean;
  placeholder?: string;
  fieldType?: "text" | "textarea" | "password";
  variant?: "text" | "outlined" | "contained";
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

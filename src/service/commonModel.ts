import { BaseTextFieldProps, InputProps, SlotProps } from "@mui/material";
import { Variable } from "./workflow/WorkflowModel";
import { ElementType } from "react";

export interface IGenericFieldProps extends Partial<Variable> {
  lbl: string;
  name: string;

  fullWidth?: boolean;
  hideHelp?: boolean;
  placeholder?: string;
  fieldType?: "text" | "textarea" | "password";
  variant?: "text" | "outlined" | "contained";
  valRegex?: RegExp;
  options?: { value: string | number; label: string | number }[];
  hideClr?: boolean;
  fetchOpt?: boolean;
  className?: string;
  slotProps?: {
    input?:
      | SlotProps<
          ElementType<InputProps, keyof JSX.IntrinsicElements>,
          {},
          BaseTextFieldProps
        >
      | undefined;
  };
}

export interface IObject {
  [key: string]: any;
}

export interface ISelectOpt {
  value: string | number;
  label: string | number;
}

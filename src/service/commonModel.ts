export interface IGenericFieldProps {
  name: string;
  // instanceId: string;
  // tokenId: string;

  placeholder?: string;
  readOnly?: 0 | 1;
  required?: 0 | 1;
  type?: "text" | "textarea" | "password";
  variant?: "text" | "outlined" | "contained";
  hidden?: 0 | 1;
  valRegex?: RegExp;
}

export interface IObject {
  [key: string]: any;
}

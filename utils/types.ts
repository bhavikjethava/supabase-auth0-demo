export interface UserProps {
  [Key: string]: any;
}

export interface Form {
  [Key: string]: string;
}

export interface FormData {
  field: string;
  value: string;
  message?: string;
  type?: string;
  customMessage?: string;
}

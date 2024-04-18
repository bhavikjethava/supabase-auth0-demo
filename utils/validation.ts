import { FormData, Form } from "./types";

export const ERROR_MESSAGES = {
  required: " is required.",
  valid: "Please enter valid ",
  weakPassword:
    "Password must contain at least one uppercase letter, one special character, and have a total length of 6 or more characters.",
};

export const VALIDATIONTYPE = {
  ISEMAIL: "email",
  ISPASSWORD: "password",
};

export const isRequired = (value: string | number | undefined): boolean => {
  return (
    value !== undefined &&
    value?.toString()?.trim() !== "" &&
    value !== null &&
    value !== -1
  );
};

export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isValidPassword = (password: string) => {
  const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+[\]{}|;:'",.<>?]).{6,}$/;
  return regex.test(password);
};

export const validateForm = (formData: Array<Form>) => {
  const errors = {} as Form;
  formData.map((data) => {
    const { field, value, type, message, customMessage } = data;
    let isEmpty = !isRequired(value);
    if (isEmpty) {
      errors[field] = customMessage
        ? customMessage
        : `${message}${ERROR_MESSAGES.required}`;
    }

    if (!isEmpty) {
      switch (type) {
        case VALIDATIONTYPE.ISEMAIL: {
          if (!isValidEmail(value)) {
            errors[field] = customMessage
              ? customMessage
              : `${ERROR_MESSAGES.valid}${message}`;
          }
          break;
        }
        case VALIDATIONTYPE.ISPASSWORD: {
          if (!isValidPassword(value)) {
            errors[field] = customMessage
              ? customMessage
              : `${ERROR_MESSAGES.weakPassword}`;
          }
          break;
        }
        default: {
          break;
        }
      }
    }
  });

  let isError = Object.keys(errors).length > 0;
  return { isError, errors };
};

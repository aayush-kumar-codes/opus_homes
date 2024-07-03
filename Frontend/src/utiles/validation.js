import * as yup from "yup";

export const loginValidateSchema = yup.object({
  email: yup.string().email("Email must valid").required("Email is Required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const registerValidateSchema = yup.object({
  first_name: yup
    .string()
    .min(3, "FirstName must be atleast 3 characters")
    .required("FirstName is Required"),
  last_name: yup
    .string()
    .min(3, "LastName must be atleast 3 characters")
    .optional("LastName is Required"),
  email: yup.string().email("Email must valid").required("Email is Required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Password doesn't match")
    .required("Confirm Password is required"),
});

export const updateValidateSchema = yup.object({
  first_name: yup
    .string()
    .min(3, "FirstName must be atleast 3 characters")
    .required("FirstName is Required"),
  last_name: yup
    .string()
    .min(3, "LastName must be atleast 3 characters")
    .optional("LastName is Required"),
});

export const roleValidationSchema = yup.object({
  role: yup.string().required("Role is Required"),
});

export const resetValidateSchema = yup.object({
  emailAddress: yup
    .string()
    .email("Email must valid")
    .required("Email is Required"),
});

export const resetPasswordValidateSchema = yup.object({
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Password doesn't match")
    .required("Confirm Password is required"),
});

export const RegisterDetails = [
  { label: "First Name", id: "first_name", type: "text" },
  { label: "Last Name", id: "last_name", type: "text" },
  { label: "Email", id: "email", type: "email" },
  { label: "Password", id: "password", type: "password" },
  { label: "Confirm Password", id: "confirm_password", type: "password" },
];
export const UpdateDetails = [
  { label: "First Name", id: "first_name", type: "text" },
  { label: "Last Name", id: "last_name", type: "text" },
];
export const LoginDetails = [
  { label: "Email", id: "email", type: "text" },
  { label: "Password", id: "password", type: "password" },
];
export const CrmFormDetails = [
  { label: "First Name", id: "first_name", type: "text" },
  { label: "Last Name", id: "last_name", type: "text" },
  { label: "Email", id: "email", type: "email" },
  { label: "Phone", id: "phone", type: "number" },
  { label: "Time Frame", id: "time_frame", type: "text" },
];
export const ResetDetails = [
  { label: "Email", id: "emailAddress", type: "text" },
];

export const ResetPasswordDetails = [
  { label: "Password", id: "newPassword", type: "password" },
  { label: "Confirm Password", id: "confirmPassword", type: "password" },
];

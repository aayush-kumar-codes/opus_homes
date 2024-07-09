import * as yup from "yup";

export const loginValidateSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Email must valid")
    .required("Email is Required"),
  password: yup
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const registerValidateSchema = yup.object({
  first_name: yup
    .string()
    .trim()
    .min(3, "FirstName must be atleast 3 characters")
    .required("FirstName is Required"),
  last_name: yup
    .string()
    .trim()
    .min(3, "LastName must be atleast 3 characters")
    .required("LastName is Required"),
  email: yup
    .string()
    .trim()
    .email("Email must valid")
    .required("Email is Required"),
  password: yup
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirm_password: yup
    .string()
    .trim()
    .oneOf([yup.ref("password")], "Password doesn't match")
    .required("Confirm Password is required"),
  role: yup.string().required("Role is Required"),
});

export const CRMValidateSchema = yup.object({
  first_name: yup
    .string()
    .trim()
    .min(3, "FirstName must be atleast 3 characters")
    .required("FirstName is Required"),
  last_name: yup
    .string()
    .trim()
    .min(3, "LastName must be atleast 3 characters")
    .required("LastName is Required"),
  email: yup
    .string()
    .trim()
    .email("Email must valid")
    .required("Email is Required"),
  phone: yup
    .string()
    .trim()
    .max(10)
    .matches(/^\+?[0-9]{10,}$/g, "Phone number must be valid")
    .required("Phone number is Required"),
  home_interested_in: yup.string().trim().required("Home Interest is Required"),
  Size_of_home: yup.string().trim().required("Size of Home is Required"),
  date: yup.date().nullable().required("Date is Required"),
  time_frame: yup.string().trim().required("Time Frame is Required"),
  financing_option: yup.string().trim().required("Financing is Required"),
  hero: yup.string().trim().required("Hero Choice is Required"),
});

export const updateValidateSchema = yup.object({
  first_name: yup
    .string()
    .trim()
    .min(3, "FirstName must be atleast 3 characters")
    .required("FirstName is Required"),
  last_name: yup
    .string()
    .trim()
    .min(3, "LastName must be atleast 3 characters")
    .required("LastName is Required"),
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

export const newJobEntryValidateSchema = yup.object({
  job_name: yup.string().trim().required("Job Name is required"),
  job_address: yup.string().trim().required("Job Address is required"),
  // job_id: yup.string().trim(),
  // .required("Job ID is required")
  job_model: yup.string().trim().required("Job Model is required"),
  contract_type: yup.string().trim().required("Contract Type is required"),
  contract_price: yup
    .number()
    .typeError("Contract Price must be a number")
    .positive("Contract Price must be positive")
    .required("Contract Price is required"),
  projected_start_date: yup
    .date()
    .nullable()
    .required("Projected Start Date is required")
    .min(new Date(), "Projected Start Date must be in the future"),
  projected_completed_date: yup
    .date()
    .nullable()
    .required("Projected Completed Date is required")
    .min(
      yup.ref("projected_start_date"),
      "Projected Completed Date must be after Projected Start Date"
    ),
  permit_municipalities: yup.string().trim().required("Permit Municipalities is required"),
  owner_first_name: yup
    .string()
    .trim()
    .required("Owner First Name is required"),
  owner_last_name: yup.string().trim().required("Owner Last Name is required"),
  owner_current_address: yup
    .string()
    .trim()
    .required("Owner Current Address is required"),
  owner_phone_number: yup
    .string()
    .trim()
    .max(10)
    .matches(/^\+?[0-9]{10,}$/g, "Phone number must be valid")
    .required("Owner Phone Number is required"),
  owner_email: yup
    .string()
    .trim()
    .email("Owner Email must be a valid email")
    .required("Owner Email is required"),
  // owner_id: yup.string().trim(),
  // .required("Owner ID is required")
  living_sqft: yup
    .number()
    .required("Living SQFT is required")
    .typeError("Living Square Feet must be a number")
    .positive("Living Square Feet must be positive"),
  total_sqft: yup
    .number()
    .required("Total SQFT is required")
    .typeError("Total Square Feet must be a number")
    .positive("Total Square Feet must be positive"),
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
export const NewJobEntryDetails = [
  { label: "Permit Municipalities", id: "permit_municipalities", type: "text" },
  { label: "Owner First Name", id: "owner_first_name", type: "text" },
  { label: "Owner Last Name", id: "owner_last_name", type: "text" },
  { label: "Owner Current Address", id: "owner_current_address", type: "text" },
  { label: "Owner Phone Number", id: "owner_phone_number", type: "number" },
  { label: "Owner Email", id: "owner_email", type: "text" },
  // { label: "Owner Id", id: "owner_id", type: "text" },
  { label: "Living SQFT", id: "living_sqft", type: "text" },
  { label: "Total SQFT", id: "total_sqft", type: "text" },
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

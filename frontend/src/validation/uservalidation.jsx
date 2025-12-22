import * as yup from "yup";

export const userSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(4, "Password must be at least 4 characters")
    .max(10, "Password cannot exceed 10 characters")
    .required("Password is required"),
});

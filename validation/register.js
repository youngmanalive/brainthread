const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email: "";
  data.password = !isEmpty(data.password) ? data.password: "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // First Name
  if (!Validator.isLength(data.firstName, { min: 2, max: 20 })) {
    errors.firstName = "First name must be between 2 and 20 characters";
  }
  if (Validator.isEmpty(data.firstName))  {
    errors.firstName = "First name required";
  }
  
  // Last Name
  if (!Validator.isLength(data.lastName, { min: 2, max: 20 })) {
    errors.lastName = "Last name must be between 2 and 20 characters";
  }
  if (Validator.isEmpty(data.lastName))  {
    errors.lastName = "Last name required";
  }
  
  // Username
  if (!Validator.isLength(data.username, { min: 2, max: 20 })) {
    errors.username = "Username must be between 2 and 20 characters";
  }
  if (Validator.isEmpty(data.username))  {
    errors.username = "Username name required";
  }

  // Email
  if (Validator.isEmpty(data.email)) { 
    errors.email = "Email is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid Email";
  }

  // Password
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
 
  // Confirm password
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password is required";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }


  return { errors, isValid: isEmpty(errors) };
};
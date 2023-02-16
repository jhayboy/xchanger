const Validation = (values) => {
    let errors = {};
  
    if (!values.fullname) {
      errors.fullname = "Name is required.";
    }
    if (!values.email) {
      errors.email = "Email is required.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Email is invalid";
    }
    if (!values.password) {
      errors.password = "Password is required.";
    } else if (values.password.length < 8) {
      errors.password = "Atleast 8 characters";
    }
  
    // Confirm Password function
    if (!values.cpassword) {
      errors.cpassword = "Comfirm password.";
    } else if (values.cpassword !== values.password) {
      errors.cpassword = "Password doesn't match";
    }
  
    //   if (values.cpassword != null && !values.cpassword.equals(values.password)) {
    //     errors.cpassword = "Confirm password is not the same as password";
    //   }
    return errors;
  };
  
  export default Validation;
  
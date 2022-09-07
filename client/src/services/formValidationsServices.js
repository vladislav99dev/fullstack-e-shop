const validateUserForms = (service, data) => {
  let messages = [];
  if (service === "login") {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
      messages.push("You should enter valid email!");
    }
    // I know i should not check the pass but i wanted to do one more check
    if (data.password.length < 6) {
      messages.push("Password should be at least 6 characters long!");
    }
  }

  if (service === "register") {
    if (!/^[a-z-']+$/i.test(data.firstName)) {
      messages.push("Fisrt name is not in a valid format!");
    }
    if (!/^[a-z-']+$/i.test(data.lastName)) {
      messages.push("Last name is not in valid format!");
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
      messages.push("Email is not in valid format!");
    }
    if (data["password"] !== data["re-password"]) {
      messages.push("Passwords are not same!");
    }
    if (!/[0-9]/.test(data.password)) {
      messages.push("Password should be only numbers!");
    }
    if (data.password.length < 6) {
      messages.push("Password should be at least 6 characters long!");
    }
    if (!/^[a-z -']+$/i.test(data.country)) {
      messages.push("Country is not in valid format!");
    }
    if (!/^[a-z -']+$/i.test(data.city)) {
      messages.push("City is not in valid format!");
    }
    if (!/^[a-z -'0-9]+$/i.test(data.street)) {
      messages.push("Street address is not in valid format!");
    }
  }
  return messages;
};

export const validateRegister = validateUserForms.bind(null, "register");
export const validateLogin = validateUserForms.bind(null, "login");

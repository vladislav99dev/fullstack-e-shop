const validate = (service, data) => {
  let messages = [];
  if (service === "login") {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email) === false
    ) {
      messages.push("You should enter valid email!");
    }
    // I know i should not check the pass but i wanted to do one more check
    if (data.password.length < 6) {
        messages.push("Password should be at least 6 characters long!")
    }
  }
  return messages;
};

export const validateRegister = validate.bind(null, "register");
export const validateLogin = validate.bind(null, "login");

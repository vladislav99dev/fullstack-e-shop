
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

export const validateProductForms = (data) => {
  const shoesSizes = [
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
  ];
  const clothingSizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const messages = [];
  if (
    !data.type ||
    !data.category ||
    !data.gender ||
    !data.brand ||
    !data.imageUrl ||
    !data.color ||
    !data.price ||
    !data.sizes
  ) {
    messages.push(
      "Product type, category, gender, brand, imageUrl, color, price, sizes are all required in order to create a product!"
    );
  }
  if (data.type !== "clothing" && data.type !== "shoes") {
    messages.push("Only clothing and shoes types are supported!");
  }
  if (data.type === "clothing") {
    let isSizesValid = false;
    if (
      data.category !== "T-shirts" &&
      data.category !== "Sweatshirts" &&
      data.category !== "Tracksuits" &&
      data.category !== "Shorts" &&
      data.category !== "Jackets"
    ) {
      messages.push(
        "Clothing supports only T-shirts, Sweatshirts, Tracksuits, Shorts, Jackets!"
      );
    }
    clothingSizes.forEach((x) => {
      if (data.sizes.hasOwnProperty(x)) {
        isSizesValid = true;
      }
    });
    if (!isSizesValid) {
      messages.push("Sizes are not in valid format!");
    }
  }
  if (data.type === "shoes") {
    let isSizesValid = false;
    if (
      data.category !== "Lifestyle" &&
      data.category !== "Running" &&
      data.category !== "Football" &&
      data.category !== "Gym" &&
      data.category !== "Boxing and Wrestling"
    ) {
      messages.push(
        "Shoes supports only Lifestyle, Running, Football, Gym, Boxing and Wrestling!"
      );
    }
    shoesSizes.forEach((x) => {
      if (data.sizes.hasOwnProperty(x)) {
       isSizesValid = true;
      }
    });
    if (!isSizesValid) {
      messages.push("Sizes are not in valid format!");
    }
  }
  if (
    data.gender !== "men" &&
    data.gender !== "women" &&
    data.gender !== "boys" &&
    data.gender !== "girls"
  ) {
    messages.push("Supported genders are Men, Women, Boys, Girls!");
  }
  if (
    data.brand !== "nike" &&
    data.brand !== "jordan" &&
    data.brand !== "adidas"
  ) {
    messages.push("Supported genders are Nike, Jordan, Adidas!");
  }
  if (
    !/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/i.test(
      data.imageUrl
    )
  ) {
    messages.push("ImageUrl is not in valid format.");
  }
  if (
    data.color !== "black" &&
    data.color !== "blue" &&
    data.color !== "red" &&
    data.color !== "orange" &&
    data.color !== "green" &&
    data.color !== "lime" &&
    data.color !== "white" &&
    data.color !== "yellow"
  ) {
    messages.push("Color isn't valid");
  }
  return messages;
};

export const validateRegister = validateUserForms.bind(null, "register");
export const validateLogin = validateUserForms.bind(null, "login");

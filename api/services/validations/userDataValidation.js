const validateIsAllDataSend = (data) => {
    if (
      !data.firstName ||
      !data.lastName ||
      !data.email ||
      !data.country ||
      !data.city ||
      !data.street ||
      !data.state ||
      !data.zipCode ||
      !data.unitNumber ||
      !data.phoneNumber ||
      !data.productsOrdered
    )
      throw {
        message:
          "Type, category, brand, gender, imageUrl, color, price, sizes should be provided in order to continue!",
      };
  };
  
const validateFirstName = (firstName) => {
    if (!/^[a-z-']+$/i.test(firstName)) {
      throw { message: "First Name is not in valid format." };
    }
  };
  
const validateLastName = (lastName) => {
    if (!/^[a-z-']+$/i.test(lastName)) {
      throw { message: "Last Name is not in valid format." };
    }
  };
  
const validateEmail = (email) => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      throw { message: "Email is not in valid format." };
    }
  };
const validateCountry = (country) => {
    if (!/^[a-z -']+$/i.test(country)) {
      throw { message: "Country is not in valid format." };
    }
  };
const validateCity = (city) => {
    if (!/^[a-z -']+$/i.test(city)) {
      throw { message: "City is not in valid format." };
    }
  };
const validateStreet = (street) => {
    if (!/^[a-z -'0-9]+$/i.test(street)) {
      throw { message: "Street is not in valid format." };
    }
  };
const validateState = (state) => {
    if (!/[A-Za-z]+$/.test(state)) {
      throw { message: "State is not in valid format." };
    }
  };
  
const validateZipCode = (zipCode) => {
    if (!/^[A-Z0-9]+$/g.test(zipCode)) {
      throw { message: "Zip Code is not in valid format." };
    }
  };
const validateUnitNumber = (unitNumber) => {
    if (!/[0-9]+$/gm.test(unitNumber)) {
      throw { message: "Unit Number is not in valid format." };
    }
  };
const validatePhoneNumber = (phoneNumber) => {
    if (!/[0-9]+$/i.test(phoneNumber)) {
      throw { message: "Phone Number is not in valid format." };
    }
  };

const validateAllData = (data) => {
    validateIsAllDataSend(data)
    validateFirstName(data.firstName);
    validateLastName(data.lastName);
    validateEmail(data.email);
    validateCountry(data.country);
    validateCity(data.city);
    validateStreet(data.street);
    validateState(data.state);
    validateZipCode(data.zipCode);
    validateUnitNumber(data.unitNumber);
    validatePhoneNumber(data.phoneNumber);
  };

  const userDataValidation ={
    validateAllData,
  }

  module.exports = userDataValidation
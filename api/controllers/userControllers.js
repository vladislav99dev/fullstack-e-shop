const router = require("express").Router();

const userServices = require("../services/userServices");

const registerHandler = async (req, res) => {
  console.log(`POST ${req.originalUrl}`);
  const { firstName, lastName, password, email, country, city, street } =
    req.body;

  if (firstName && lastName && password && email && country && city && street) {
    try {
      let isUserFound = await userServices.findOne(email);
      if (isUserFound === null) {
        const dbResponse = await userServices.create(
          firstName,
          lastName,
          password,
          email,
          country,
          city,
          street
        );
        res.status(201).json(dbResponse);
      } else if (isUserFound.hasOwnProperty("email")) {
        let error = "User with this email already exist!";
        res.status(409).json({ error });
      }
    } catch (err) {
      console.log(err);
      let error = err._message;
      let errors = Object.values(err.errors);
      let specifficError = errors[0].properties.message;
      res.status(400).json({ error, specifficError });
    }
  } else {
    let error =
      "FisrtName, LastName, Email, Country, City and Street need to be provided to continue!";
    res.status(400).json({ error });
  }
};

router.post("/register", registerHandler);

module.exports = router;

// const router = require("express").Router();

// const userServices = require("../services/userServices");

// const registerHandler = async (req, res) => {
//   console.log(`POST ${req.originalUrl}`);
//   const { firstName, lastName, password, email, country, city, street } = req.body;

//   if (firstName && lastName && password && email && country && city && street) {
//     try {
//       let isUserFound = await userServices.findOne(email);
//       if (isUserFound.hasOwnProperty("email")) {
//         let error = "User with this email already exist!";
//         res.status(409).json({ error });
//       } else  {
//         const dbResponse = await userServices.create(
//           firstName,
//           lastName,
//           password,
//           email,
//           country,
//           city,
//           street
//         );
//         res.status(201).json(dbResponse);
//       }
//     } catch (err) {
//       console.log(err);
//       let error = err._message;
//       let errors = Object.values(err.errors);
//       let specifficError = errors[0].properties.message;
//       res.status(400).json({ error, specifficError });
//     }
//   } else {
//     let error =
//       "FisrtName, LastName, Email, Country, City and Street need to be provided to continue!";
//     res.status(400).json({ error });
//   }
// };

// router.post("/register", registerHandler);

// module.exports = router;

const usersStorage = require("../storages/usersStorage");

// This just shows the new stuff we're adding to the existing contents
const { body, validationResult, matchedData } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";
const emailErr = "must be a valid email address.";
const ageErr = "must be a number between 18 and 120"
const bioErr = "must be at most 200 characters."

const validateUser = [
  body("firstName").trim()
    .isAlpha().withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`First name ${lengthErr}`),
  body("lastName").trim()
    .isAlpha().withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`Last name ${lengthErr}`),
  body("email").trim()
    .isEmail().withMessage(`Email ${emailErr}`)
    .normalizeEmail(),
  body("age")
    .optional({ checkFalsy: true })
    .isInt({ min: 18, max: 120 })
    .withMessage(`Age ${ageErr}`),
  body("bio")
    .optional({ checkFalsy: true })
    .isLength({ max: 200 })
    .withMessage(`Bio ${bioErr}`)
    .trim()
];

exports.usersListGet = (req, res) => {
  res.render("index", {
    title: "User list",
    users: usersStorage.getUsers(),
  });
};

exports.usersCreateGet = (req, res) => {
  res.render("createUser", {
    title: "Create user",
  });
};

exports.usersCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createUser", {
        title: "Create user",
        errors: errors.array(),
      });
    }
    const data = matchedData(req);
    usersStorage.addUser(data);
    res.redirect("/");
  }
];

exports.usersUpdateGet = (req, res) => {
  const user = usersStorage.getUser(req.params.id);
  res.render("updateUser", {
    title: "Update user",
    user: user,
  });
};

exports.usersUpdatePost = [
  validateUser,
  (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateUser", {
        title: "Update user",
        user: user,
        errors: errors.array(),
      });
    }
    const data = matchedData(req);
    usersStorage.updateUser(req.params.id, data);
    res.redirect("/");
  }
];

exports.usersDeletePost = (req, res) => {
  usersStorage.deleteUser(req.params.id);
  res.redirect("/");
};;

exports.usersSearchGet = (req, res) => {
  const { name, email } = req.query; // GET query params
  const results = usersStorage.searchUsers({ name, email });

  res.render("search", {
    title: "Search results",
    users: results,
    query: { name, email }
  });
};

const { body, param, query } = require("express-validator");

const validateCreateUser = [
    body("name")
        .exists().withMessage("Name of users is required")
        .isString().withMessage("Name should be string"),
    body("email")
        .exists().withMessage("User email is required")
        .isEmail().withMessage("Valid email is required"),
    body("password")
        .exists().withMessage("User password is required")
        .isString().withMessage("Password should be string"),
    body("role")
        .exists().withMessage("User role is required")
        .isString().withMessage("Role should be string")
];

const validateUpdateUser = [
    body("name")
        .exists().withMessage("Name of users is required")
        .isString().withMessage("Name should be string"),
    body("email")
        .exists().withMessage("User email is required")
        .isEmail().withMessage("Valid email is required"),
    body("password")
        .exists().withMessage("User password is required")
        .isString().withMessage("Password should be string"),
    body("role")
        .exists().withMessage("User role is required")
        .isString().withMessage("Role should be string"),
    body("old_email")
        .exists().withMessage("Old email is required")
        .isEmail().withMessage("Valid Old email is required")
];

const validateDeleteUser = [
    query('email')
        .notEmpty().withMessage("Email should exist to delete an user")
        .isEmail().withMessage("Valid email is required")
];

module.exports = {
    validateCreateUser,
    validateUpdateUser,
    validateDeleteUser
};
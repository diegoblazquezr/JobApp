const { body, param, query } = require("express-validator");

const validateCreateFavorite = [
    body("user_id")
        .exists().withMessage("User_id is required")
        .isNumeric().withMessage("User_id should be numeric"),
    body("job_id")
        .exists().withMessage("Job_id is required")
        .isString().withMessage("Job_id should be string")
];

const validateDeleteFavorite = [
    query("user_id")
        .exists().withMessage("User_id is required")
        .isNumeric().withMessage("User_id should be numeric"),
    query("job_id")
        .exists().withMessage("Job_id is required")
        .isString().withMessage("Job_id should be string")
];

module.exports = {
    validateCreateFavorite,
    validateDeleteFavorite
};
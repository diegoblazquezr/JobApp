const { body, param, query } = require("express-validator");

const validateCreateJob = [
    body("title")
        .exists().withMessage("Title of job is required")
        .isString().withMessage("Title should be a string"),
    body("description")
        .exists().withMessage("Job description is required")
        .isString().withMessage("Description should be a string"),
    body("skills")
        .exists().withMessage("Skills are required")
        .isString().withMessage("Skills should be a string"),
    body("client_location")
        .exists().withMessage("Location is required")
        .isString().withMessage("Location should be a string"),
    body("url")
        .exists().withMessage("URL is required")
        .isString().withMessage("URL should be a string"),
    body("source")
        .exists().withMessage("Source is required")
        .isString().withMessage("Source should be a string"),
    body("status")
        .exists().withMessage("Status is required")
        .isBoolean({ strict: true }).withMessage("Status has to be boolean")
];

const validateUpdateJob = [
    query("title")
        .exists().withMessage("Old title is required")
        .isString().withMessage("Old title should be a string"),
    body("title")
        .exists().withMessage("Title of job is required")
        .isString().withMessage("Title should be a string"),
    body("description")
        .exists().withMessage("Job description is required")
        .isString().withMessage("Description should be a string"),
    body("skills")
        .exists().withMessage("Skills required")
        .isString().withMessage("Skills should be a string"),
    body("client_location")
        .exists().withMessage("Location is required")
        .isString().withMessage("Location should be a string"),
    body("url")
        .exists().withMessage("URL is required")
        .isString().withMessage("URL should be a string"),
    body("source")
        .exists().withMessage("Source is required")
        .isString().withMessage("Source should be a string"),
    body("status")
        .exists().withMessage("Status is required")
        .isBoolean({ strict: true }).withMessage("Status has to be boolean")
];

const validateDeleteJob = [
    query("title").notEmpty().withMessage("Title should exist to delete a job")
];

module.exports = {
    validateCreateJob,
    validateUpdateJob,
    validateDeleteJob
};


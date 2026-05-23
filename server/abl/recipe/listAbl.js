const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;

const ajv = new Ajv();
addFormats(ajv);

const recipeDao = require("../../dao/recipe-dao.js");

const schema = {
  type: "object",
  properties: {
    search: { type: "string" },
    rating: { type: "string" },
    recipeCategoryId: { type: "string" },
  },
  required: [],
  additionalProperties: false,
};

async function ListAbl(req, res) {
  try {
    const dtoIn =
      req.query && Object.keys(req.query).length ? req.query : req.body || {};

    const valid = ajv.validate(schema, dtoIn);

    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const recipeList = recipeDao.list(dtoIn);

    res.json({
      itemList: recipeList,
    });
  } catch (e) {
    console.error(e);

    res.status(500).json({
      code: "internalServerError",
      message: e.message,
    });
  }
}

module.exports = ListAbl;

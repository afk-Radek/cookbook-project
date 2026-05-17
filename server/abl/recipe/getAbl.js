const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const recipeDao = require("../../dao/recipe-dao.js");
const categoryDao = require("../../dao/category-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
  },
  required: ["id"],
  additionalProperties: false,
};

async function GetAbl(req, res) {
  try {
    const dtoIn = req.query?.id ? req.query : req.body;

    const valid = ajv.validate(schema, dtoIn);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const recipe = recipeDao.get(dtoIn.id);

    if (!recipe) {
      res.status(404).json({
        code: "recipeNotFound",
        message: `Recipe ${dtoIn.id} not found`,
      });
      return;
    }

    const recipeCategory = categoryDao.get(recipe.recipeCategoryId);

    res.json({
      ...recipe,
      recipeCategory,
    });
  } catch (e) {
    res.status(500).json({
      code: "internalServerError",
      message: e.message,
    });
  }
}

module.exports = GetAbl;

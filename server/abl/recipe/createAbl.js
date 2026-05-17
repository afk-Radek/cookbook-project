const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;

const ajv = new Ajv();
addFormats(ajv);

const recipeDao = require("../../dao/recipe-dao.js");
const categoryDao = require("../../dao/category-dao.js");

const schema = {
  type: "object",
  properties: {
    title: { type: "string", minLength: 1, maxLength: 150 },
    preparationTime: { type: "number", minimum: 1 },
    numberOfIngredients: { type: "number", minimum: 1 },
    rating: { type: "number", minimum: 1, maximum: 5 },
    description: { type: "string", minLength: 1, maxLength: 1000 },
    preparationSteps: { type: "string", minLength: 1, maxLength: 5000 },
    note: { type: "string", maxLength: 1000 },
    recipeCategoryId: { type: "string", minLength: 32, maxLength: 32 },
  },
  required: [
    "title",
    "preparationTime",
    "numberOfIngredients",
    "description",
    "preparationSteps",
    "recipeCategoryId",
  ],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    const dtoIn = req.body;

    const valid = ajv.validate(schema, dtoIn);

    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const category = categoryDao.get(dtoIn.recipeCategoryId);

    if (!category) {
      res.status(400).json({
        code: "categoryDoesNotExist",
        message: `category with id ${dtoIn.recipeCategoryId} does not exist`,
      });
      return;
    }

    const createdRecipe = recipeDao.create(dtoIn);

    res.json({
      ...createdRecipe,
      category,
    });
  } catch (e) {
    console.error(e);

    res.status(500).json({
      code: "internalServerError",
      message: e.message,
    });
  }
}

module.exports = CreateAbl;

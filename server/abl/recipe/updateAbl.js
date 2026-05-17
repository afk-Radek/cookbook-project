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
    title: { type: "string", minLength: 1 },
    preparationTime: { type: "number", minimum: 1 },
    numberOfIngredients: { type: "number", minimum: 1 },
    rating: { type: "number", minimum: 1, maximum: 5 },
    description: { type: "string", minLength: 1 },
    preparationSteps: { type: "string", minLength: 1 },
    note: { type: "string" },
    recipeCategoryId: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    const recipe = req.body;

    const valid = ajv.validate(schema, recipe);

    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const existingRecipe = recipeDao.get(recipe.id);

    if (!existingRecipe) {
      res.status(404).json({
        code: "recipeNotFound",
        message: `Recipe ${recipe.id} not found`,
      });
      return;
    }

    if (recipe.recipeCategoryId) {
      const category = categoryDao.get(recipe.recipeCategoryId);

      if (!category) {
        res.status(400).json({
          code: "recipeCategoryDoesNotExist",
          message: `Recipe category with id ${recipe.recipeCategoryId} does not exist`,
        });
        return;
      }
    }

    const updatedRecipe = recipeDao.update(recipe);

    const recipeCategory = categoryDao.get(updatedRecipe.recipeCategoryId);

    res.json({
      ...updatedRecipe,
      recipeCategory,
    });
  } catch (e) {
    res.status(500).json({
      code: "internalServerError",
      message: e.message,
    });
  }
}

module.exports = UpdateAbl;

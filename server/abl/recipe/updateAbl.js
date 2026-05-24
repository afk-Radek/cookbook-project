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
    title: { type: "string", minLength: 1, maxLength: 150 },
    preparationTime: { type: "number", minimum: 1 },
    numberOfIngredients: { type: "number", minimum: 1 },
    rating: { type: "number", minimum: 1, maximum: 5 },
    description: { type: "string", minLength: 1, maxLength: 1000 },
    preparationSteps: { type: "string", minLength: 1, maxLength: 5000 },
    note: { type: "string", maxLength: 1000 },
    recipeCategoryId: { type: "string", minLength: 32, maxLength: 32 },
  },
  required: ["id"],
  additionalProperties: false,
};

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : value;
}

async function UpdateAbl(req, res) {
  try {
    const recipe = {
      ...req.body,
      title: normalizeText(req.body.title),
      description: normalizeText(req.body.description),
      preparationSteps: normalizeText(req.body.preparationSteps),
      note: normalizeText(req.body.note),
    };

    const valid = ajv.validate(schema, recipe);

    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "Recipe input is not valid.",
        validationError: ajv.errors,
      });
      return;
    }

    const existingRecipe = recipeDao.get(recipe.id);

    if (!existingRecipe) {
      res.status(404).json({
        code: "recipeNotFound",
        message: `Recipe ${recipe.id} not found.`,
      });
      return;
    }

    if (recipe.title) {
      const recipeList = recipeDao.list();

      const recipeExists = recipeList.some(
        (item) =>
          item.id !== recipe.id &&
          item.title.trim().toLowerCase() === recipe.title.toLowerCase(),
      );

      if (recipeExists) {
        res.status(400).json({
          code: "recipeAlreadyExists",
          message: `Recipe with title "${recipe.title}" already exists.`,
        });
        return;
      }
    }

    if (recipe.recipeCategoryId) {
      const category = categoryDao.get(recipe.recipeCategoryId);

      if (!category) {
        res.status(400).json({
          code: "recipeCategoryDoesNotExist",
          message: `Recipe category with id ${recipe.recipeCategoryId} does not exist.`,
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

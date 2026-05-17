const Ajv = require("ajv");
const ajv = new Ajv();

const recipeCategoryDao = require("../../dao/category-dao.js");
const recipeDao = require("../../dao/recipe-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function DeleteAbl(req, res) {
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

    const recipeList = recipeDao.listByRecipeCategoryId(dtoIn.id);

    if (recipeList.length) {
      res.status(400).json({
        code: "recipeCategoryWithRecipes",
        message: "Recipe category has related recipes and cannot be deleted",
      });
      return;
    }

    recipeCategoryDao.remove(dtoIn.id);

    res.json({});
  } catch (e) {
    console.error(e);
    res.status(500).json({
      code: "internalServerError",
      message: e.message,
    });
  }
}

module.exports = DeleteAbl;

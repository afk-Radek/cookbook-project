const Ajv = require("ajv");
const ajv = new Ajv();

const recipeDao = require("../../dao/recipe-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
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

    const recipe = recipeDao.get(dtoIn.id);

    if (!recipe) {
      res.status(404).json({
        code: "recipeDoesNotExist",
        message: "Recipe does not exist",
      });
      return;
    }

    recipeDao.remove(dtoIn.id);

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

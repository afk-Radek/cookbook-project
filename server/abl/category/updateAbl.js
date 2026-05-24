const Ajv = require("ajv");
const ajv = new Ajv();

const categoryDao = require("../../dao/category-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
    name: { type: "string", minLength: 1, maxLength: 80 },
    desc: { type: "string", maxLength: 500 },
  },
  required: ["id"],
  additionalProperties: false,
};

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : value;
}

async function UpdateAbl(req, res) {
  try {
    const category = {
      ...req.body,
      name: normalizeText(req.body.name),
      desc: normalizeText(req.body.desc),
    };

    const valid = ajv.validate(schema, category);

    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "Category input is not valid.",
        validationError: ajv.errors,
      });
      return;
    }

    const existingCategory = categoryDao.get(category.id);

    if (!existingCategory) {
      res.status(404).json({
        code: "categoryNotFound",
        message: `Category with id ${category.id} not found.`,
      });
      return;
    }

    if (category.name) {
      const categoryList = categoryDao.list();

      const categoryExists = categoryList.some(
        (item) =>
          item.id !== category.id &&
          item.name.trim().toLowerCase() === category.name.toLowerCase(),
      );

      if (categoryExists) {
        res.status(400).json({
          code: "categoryAlreadyExists",
          message: `Category with name "${category.name}" already exists.`,
        });
        return;
      }
    }

    const updatedCategory = categoryDao.update(category);

    res.json(updatedCategory);
  } catch (e) {
    res.status(500).json({
      code: "internalServerError",
      message: e.message,
    });
  }
}

module.exports = UpdateAbl;

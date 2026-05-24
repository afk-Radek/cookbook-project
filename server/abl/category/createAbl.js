const Ajv = require("ajv");
const ajv = new Ajv();

const categoryDao = require("../../dao/category-dao");

const schema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 1, maxLength: 80 },
    desc: { type: "string", maxLength: 500 },
  },
  required: ["name"],
  additionalProperties: false,
};

const validate = ajv.compile(schema);

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : value;
}

function createAbl(req, res) {
  try {
    const data = {
      ...req.body,
      name: normalizeText(req.body.name),
      desc: normalizeText(req.body.desc),
    };

    const valid = validate(data);

    if (!valid) {
      return res.status(400).json({
        code: "dtoInIsNotValid",
        message: "Category input is not valid.",
        validationError: validate.errors,
      });
    }

    const categoryList = categoryDao.list();

    const categoryExists = categoryList.some(
      (category) =>
        category.name.trim().toLowerCase() === data.name.toLowerCase(),
    );

    if (categoryExists) {
      return res.status(400).json({
        code: "categoryAlreadyExists",
        message: `Category with name "${data.name}" already exists.`,
      });
    }

    const category = categoryDao.create(data);

    res.json(category);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      code: "internalServerError",
      message: error.message,
    });
  }
}

module.exports = createAbl;

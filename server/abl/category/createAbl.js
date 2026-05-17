const Ajv = require("ajv");
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

const categoryDao = require("../../dao/category-dao");

const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    desc: { type: "string" },
  },
  required: ["name"],
  additionalProperties: false,
};

const validate = ajv.compile(schema);

function createAbl(req, res) {
  try {
    const data = req.body;

    const valid = validate(data);
    if (!valid) {
      return res.status(400).json({ error: validate.errors });
    }

    data.name = data.name.trim();

    const category = categoryDao.create(data);

    res.send(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = createAbl;

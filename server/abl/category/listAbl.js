const categoryDao = require("../../dao/category-dao.js");

async function ListAbl(req, res) {
  try {
    const categoryList = categoryDao.list();

    res.json({
      itemList: categoryList,
    });
  } catch (e) {
    console.error(e);

    res.status(500).json({
      code: e.code || "internalServerError",
      message: e.message,
    });
  }
}

module.exports = ListAbl;

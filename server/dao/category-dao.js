const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const categoryFolderPath = path.join(
  __dirname,
  "storage",
  "recipeCategoryList",
);

function get(categoryId) {
  try {
    const filePath = path.join(categoryFolderPath, `${categoryId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;

    throw {
      code: "failedToReadCategory",
      message: error.message,
    };
  }
}

function create(category) {
  try {
    const categoryList = list();

    if (categoryList.some((item) => item.name === category.name)) {
      throw {
        code: "uniqueNameAlreadyExists",
        message: "Category with given name already exists",
      };
    }

    category.id = crypto.randomBytes(16).toString("hex");

    const filePath = path.join(categoryFolderPath, `${category.id}.json`);
    const fileData = JSON.stringify(category, null, 2);

    fs.writeFileSync(filePath, fileData, "utf8");

    return category;
  } catch (error) {
    throw {
      code: error.code || "failedToCreateCategory",
      message: error.message,
    };
  }
}

function update(category) {
  try {
    const currentCategory = get(category.id);

    if (!currentCategory) return null;

    if (category.name && category.name !== currentCategory.name) {
      const categoryList = list();

      if (categoryList.some((item) => item.name === category.name)) {
        throw {
          code: "uniqueNameAlreadyExists",
          message: "Category with given name already exists",
        };
      }
    }

    const newCategory = {
      ...currentCategory,
      ...category,
    };

    const filePath = path.join(categoryFolderPath, `${category.id}.json`);
    const fileData = JSON.stringify(newCategory, null, 2);

    fs.writeFileSync(filePath, fileData, "utf8");

    return newCategory;
  } catch (error) {
    throw {
      code: error.code || "failedToUpdateCategory",
      message: error.message,
    };
  }
}

function remove(categoryId) {
  try {
    const filePath = path.join(categoryFolderPath, `${categoryId}.json`);
    fs.unlinkSync(filePath);

    return {};
  } catch (error) {
    if (error.code === "ENOENT") return {};

    throw {
      code: "failedToRemoveCategory",
      message: error.message,
    };
  }
}

function list() {
  try {
    if (!fs.existsSync(categoryFolderPath)) {
      fs.mkdirSync(categoryFolderPath, { recursive: true });
    }

    const files = fs.readdirSync(categoryFolderPath);

    return files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(categoryFolderPath, file),
        "utf8",
      );

      return JSON.parse(fileData);
    });
  } catch (error) {
    throw {
      code: "failedToListCategories",
      message: error.message,
    };
  }
}

function getCategoryMap() {
  const categoryMap = {};
  const categoryList = list();

  categoryList.forEach((category) => {
    categoryMap[category.id] = category;
  });

  return categoryMap;
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
  getCategoryMap,
};

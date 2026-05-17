const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const recipeFolderPath = path.join(__dirname, "storage", "recipeList");

function get(recipeId) {
  try {
    const filePath = path.join(recipeFolderPath, `${recipeId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadRecipe", message: error.message };
  }
}

function create(recipe) {
  try {
    recipe.id = crypto.randomBytes(16).toString("hex");

    const filePath = path.join(recipeFolderPath, `${recipe.id}.json`);
    const fileData = JSON.stringify(recipe, null, 2);

    fs.writeFileSync(filePath, fileData, "utf8");
    return recipe;
  } catch (error) {
    throw { code: "failedToCreateRecipe", message: error.message };
  }
}

function update(recipe) {
  try {
    const currentRecipe = get(recipe.id);
    if (!currentRecipe) return null;

    const newRecipe = { ...currentRecipe, ...recipe };

    const filePath = path.join(recipeFolderPath, `${recipe.id}.json`);
    const fileData = JSON.stringify(newRecipe, null, 2);

    fs.writeFileSync(filePath, fileData, "utf8");
    return newRecipe;
  } catch (error) {
    throw { code: "failedToUpdateRecipe", message: error.message };
  }
}

function remove(recipeId) {
  try {
    const filePath = path.join(recipeFolderPath, `${recipeId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw { code: "failedToRemoveRecipe", message: error.message };
  }
}

function list(filter = {}) {
  try {
    const files = fs.readdirSync(recipeFolderPath);

    let recipeList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(recipeFolderPath, file),
        "utf8",
      );
      return JSON.parse(fileData);
    });

    if (filter.recipeCategoryId) {
      recipeList = recipeList.filter(
        (recipe) => recipe.recipeCategoryId === filter.recipeCategoryId,
      );
    }

    if (filter.rating) {
      recipeList = recipeList.filter(
        (recipe) => Number(recipe.rating) === Number(filter.rating),
      );
    }

    if (filter.search) {
      const search = filter.search.toLowerCase();

      recipeList = recipeList.filter((recipe) => {
        return (
          recipe.title?.toLowerCase().includes(search) ||
          recipe.description?.toLowerCase().includes(search)
        );
      });
    }

    recipeList.sort((a, b) => a.title.localeCompare(b.title));

    return recipeList;
  } catch (error) {
    throw { code: "failedToListRecipes", message: error.message };
  }
}

function listByRecipeCategoryId(recipeCategoryId) {
  const recipeList = list();
  return recipeList.filter(
    (recipe) => recipe.recipeCategoryId === recipeCategoryId,
  );
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
  listByRecipeCategoryId,
};

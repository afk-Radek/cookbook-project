const express = require("express");
const app = express();
const port = 8888;

const recipeCategoryController = require("./controller/recipeCategory");
const recipeController = require("./controller/recipe");

app.use(express.json());

app.use("/recipeCategory", recipeCategoryController);
app.use("/recipe", recipeController);

app.get("/", (req, res) => {
  res.send("CookBook backend is running!");
});

app.listen(port, () => {
  console.log(`CookBook backend listening on port ${port}`);
});

const { Router } = require("express");
const router = new Router();
const Categories = require("../models").category;

//GET all categories
router.get("/", async (req, res, next) => {
  try {
    const allCategories = await Categories.findAll();
    res.status(200).send(allCategories);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;

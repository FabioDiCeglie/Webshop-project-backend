const { Router } = require("express");
const router = new Router();
const Products = require("../models").product;
const auth = require("../auth/middleware");

//GET all products
router.get("/", async (req, res, next) => {
  try {
    const allProducts = await Products.findAll();

    res.status(200).send(allProducts);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//GET product by id
router.get("/:id", async (req, res, next) => {
  try {
    const productId = req.params.id;

    const product = await Products.findByPk(productId);

    if (!product) {
      return res.status(404).send(`Product ID ${productId} not found!`);
    }

    res.status(200).send(product);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Delete product by id
router.delete("/delete/:id", auth, async (req, res, next) => {
  try {
    const productId = req.params.id;

    const product = await Products.findByPk(productId);

    if (!product) {
      return res.status(404).send(`Product ID ${productId} not found!`);
    }

    res.status(200).send(product);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;

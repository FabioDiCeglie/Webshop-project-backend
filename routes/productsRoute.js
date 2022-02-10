const { Router } = require('express');
const router = new Router();
const Products = require('../models').product;

//GET all products
router.get('/', async (req, res, next) => {
  const limit = req.query.limit || 5;
  const offset = req.query.offset || 0;
  const categoryIds = req.query.categoryIds;

  try {
    const queryOptions = {
      limit,
      offset,
      where: {},
    };

    if (categoryIds) {
      queryOptions.where.categoryId = categoryIds;
    }
    // if (ratings) {
    //   queryOptions.where.ratingOption = ratings;
    // }

    const allProducts = await Products.findAndCountAll(queryOptions);

    res
      .status(200)
      .send({ result: allProducts.rows, total: allProducts.count });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//GET product by id
router.get('/:id', async (req, res, next) => {
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

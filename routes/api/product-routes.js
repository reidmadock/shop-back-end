const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  try {
    const productData = await Product.findAll({
      include: [{ model: Category}, { model: Tag }],
    });
    res.status(200).json(productData); //post succesful status and return data.
  } catch (err) {
    res.status(500).json(err); //post unsuccesful status and return the error.
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  try {
    const productData = await Product.findByPk(req.params.id ,
      { include: [{ model: Category}, { model: Tag }], });
    res.status(200).json(productData); //post succesful status and return data.
  } catch (err) {
    res.status(500).json(err); //post unsuccesful status and return the error.
  }
});
/*
// create new product
router.post('/', (req, res) => {
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tag_ids) {
        const productTagIdArr = req.body.tag_ids.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});
*/
router.post('/', (req, res) => {
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tag_ids) {
        const productTagIdArr = req.body.tag_ids.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => {
      res.status(200).json(productTagIds)
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

/*
 Updating a product means you also have to handle it's associated data.
 Implementing it like this assumes an empty tag_ids array in the
 req.body means this product should no longer have tags.
*/
router.put('/:id', async (req, res) => {
  try { // Clear obselete tag data
    await ProductTag.destroy({ where: { product_id: req.params.id }});
    // Update product data
    const updateProduct = await Product.update(req.body, { where: { id: req.params.id }});
    // Create new tags
    console.log(req.body.tag_ids);
    if (req.body.tag_ids) {
      const productTagIdArr = req.body.tag_ids
      .map((tag_id) =>{ return { product_id: parseInt(req.params.id), tag_id: tag_id }});
      await ProductTag.bulkCreate(productTagIdArr);
    }
    res.status(200).json(updateProduct);}
  catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // Default behavior is to delete all ProductTags too, so I don't have to account for them.
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      }
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
